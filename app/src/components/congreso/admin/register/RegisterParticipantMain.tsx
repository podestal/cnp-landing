import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import SearchParticipantByDni from './SearchParticipantByDni'
import ParticipantFoundCard from './ParticipantFoundCard'
import QrCodeScanner from './QrCodeScanner'
import QrCodeLinked from './QrCodeLinked'
import { useRegisterParticipantQR } from '../../../../hooks/api/participant/useRegisterParticipantQR'
import { useNotificationStore } from '../../../../utils/notificationStore'
import type { Participant } from '../../../../services/api/participantService'

type Step = 'search' | 'found' | 'scanning' | 'linked'

const RegisterParticipantMain = () => {
  const [currentStep, setCurrentStep] = useState<Step>('search')
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [scannedQrCode, setScannedQrCode] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchKey] = useState(0) // Key to force remount of SearchParticipantByDni
  const hasProcessedQrRef = useRef<string | null>(null) // Track processed QR codes
  const isResettingRef = useRef(false) // Track if we're in reset state
  const currentStepRef = useRef<Step>(currentStep) // Ref to track current step for callbacks
  
  const registerParticipantQR = useRegisterParticipantQR()
  const addNotification = useNotificationStore((state: ReturnType<typeof useNotificationStore.getState>) => state.addNotification)

  // Sync ref with state
  useEffect(() => {
    currentStepRef.current = currentStep
  }, [currentStep])

  // Update ref whenever step changes
  const updateStep = useCallback((newStep: Step) => {
    currentStepRef.current = newStep
    setCurrentStep(newStep)
  }, [])

  const handleParticipantFound = useCallback((participant: Participant) => {
    // Only set participant if we're in search step and not resetting
    if (currentStepRef.current === 'search' && !isResettingRef.current) {
      setSelectedParticipant(participant)
      updateStep('found')
    }
  }, [updateStep])

  const handleProceedToScan = () => {
    // Reset QR processing ref when starting a new scan session
    hasProcessedQrRef.current = null
    updateStep('scanning')
  }

  const handleQrCodeScanned = useCallback(async (qrCode: string) => {
    // Only process if we're in the scanning step - use ref to get latest value
    if (currentStepRef.current !== 'scanning') {
      return
    }

    // Block if we're in reset state
    if (isResettingRef.current) {
      return
    }

    if (!selectedParticipant?.dni) {
      addNotification({
        type: 'error',
        message: 'Error: No se pudo identificar el DNI del participante',
      })
      return
    }

    // Prevent multiple calls if already processing or if this QR was already processed
    if (registerParticipantQR.isPending || hasProcessedQrRef.current === qrCode) {
      return
    }

    // Mark this QR as being processed IMMEDIATELY
    hasProcessedQrRef.current = qrCode

    try {
      // Register QR code using the new endpoint
      const response = await registerParticipantQR.mutateAsync({
        dni: selectedParticipant.dni,
        qr: qrCode,
      })

      // Update local state with the participant from response
      setScannedQrCode(qrCode)
      setSelectedParticipant(response.participant)
      
      // Show success notification using the message from backend
      addNotification({
        type: 'success',
        message: response.message,
      })

      // Move to linked step IMMEDIATELY to prevent any more scans
      // This will close the scanner
      updateStep('linked')
      
    } catch (error: any) {
      console.error('Error linking QR code:', error)
      // Reset the processed flag on error so user can scan again
      // DON'T change step - keep scanner open so user can try another QR
      hasProcessedQrRef.current = null
      
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message || ''
      addNotification({
        type: 'error',
        message: errorMessage || 'Error al vincular el código QR. Por favor, intenta nuevamente.',
      })
      
      // Scanner stays open - user can scan another QR code
    }
  }, [selectedParticipant, registerParticipantQR, addNotification])

  const handleLinkAnother = useCallback(() => {
    // Simply reload the page to reset everything completely
    window.location.reload()
  }, [])

  const handleCloseScanner = () => {
    updateStep('found')
  }

  const handleCloseLinked = () => {
    handleLinkAnother()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Registrar Participante
          </h1>
          <p className="text-gray-600">
            Busca un participante por DNI y vincula un código QR
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {[
              { step: 'search', label: 'Buscar', icon: '1' },
              { step: 'found', label: 'Verificar', icon: '2' },
              { step: 'scanning', label: 'Escanear', icon: '3' },
              { step: 'linked', label: 'Completado', icon: '✓' },
            ].map((item, index) => {
              const stepIndex = ['search', 'found', 'scanning', 'linked'].indexOf(currentStep)
              const isActive = index <= stepIndex
              const isCurrent = index === stepIndex

              return (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                      transition-all duration-300
                      ${
                        isCurrent
                          ? 'bg-green-600 text-white scale-110'
                          : isActive
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-200 text-gray-400'
                      }
                    `}
                  >
                    {item.icon}
                  </div>
                  {index < 3 && (
                    <div
                      className={`
                        w-8 sm:w-16 h-1 mx-1 transition-colors duration-300
                        ${isActive ? 'bg-green-600' : 'bg-gray-200'}
                      `}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {currentStep === 'search' && (
            <SearchParticipantByDni
              key={searchKey}
              onParticipantFound={handleParticipantFound}
              isLoading={isSearching}
              setIsLoading={setIsSearching}
            />
          )}

          {currentStep === 'found' && selectedParticipant && (
            <ParticipantFoundCard
              participant={selectedParticipant}
              onProceedToScan={handleProceedToScan}
            />
          )}

          {currentStep === 'scanning' && selectedParticipant && (
            <QrCodeScanner
              onQrCodeScanned={handleQrCodeScanned}
              onClose={handleCloseScanner}
              participantName={`${selectedParticipant.name} ${selectedParticipant.last_name}`}
              isLinking={registerParticipantQR.isPending}
            />
          )}

          {currentStep === 'linked' && selectedParticipant && scannedQrCode && (
            <QrCodeLinked
              participantName={`${selectedParticipant.name} ${selectedParticipant.last_name}`}
              qrCode={scannedQrCode}
              onClose={handleCloseLinked}
              onLinkAnother={handleLinkAnother}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default RegisterParticipantMain
