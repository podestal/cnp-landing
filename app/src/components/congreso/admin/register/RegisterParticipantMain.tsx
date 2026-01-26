import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import SearchParticipantByDni from './SearchParticipantByDni'
import ParticipantFoundCard from './ParticipantFoundCard'
import QrCodeScanner from './QrCodeScanner'
import QrCodeLinked from './QrCodeLinked'
import { useQueryClient } from '@tanstack/react-query'
import { useRegisterParticipantQR } from '../../../../hooks/api/participant/useRegisterParticipantQR'
import { useNotificationStore } from '../../../../utils/notificationStore'
import type { Participant } from '../../../../services/api/participantService'

type Step = 'search' | 'found' | 'scanning' | 'linked'

const RegisterParticipantMain = () => {
  const [currentStep, setCurrentStep] = useState<Step>('search')
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [scannedQrCode, setScannedQrCode] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchKey, setSearchKey] = useState(0) // Key to force remount of SearchParticipantByDni
  const hasProcessedQrRef = useRef<string | null>(null) // Track processed QR codes
  const isResettingRef = useRef(false) // Track if we're in reset state
  
  const registerParticipantQR = useRegisterParticipantQR()
  const addNotification = useNotificationStore((state: ReturnType<typeof useNotificationStore.getState>) => state.addNotification)
  const queryClient = useQueryClient()

  const handleParticipantFound = useCallback((participant: Participant) => {
    // Only set participant if we're in search step and not resetting
    if (currentStep === 'search' && !isResettingRef.current) {
      setSelectedParticipant(participant)
      setCurrentStep('found')
    }
  }, [currentStep])

  const handleProceedToScan = () => {
    setCurrentStep('scanning')
  }

  const handleQrCodeScanned = useCallback(async (qrCode: string) => {
    // Only process if we're in the scanning step - prevent processing after navigation
    if (currentStep !== 'scanning') {
      return
    }

    // Block if we're in reset state
    if (isResettingRef.current || hasProcessedQrRef.current === 'RESET') {
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
      const updatedParticipant = await registerParticipantQR.mutateAsync({
        dni: selectedParticipant.dni,
        qr: qrCode,
      })

      // Update local state
      setScannedQrCode(qrCode)
      setSelectedParticipant(updatedParticipant)
      
      // Show success notification
      addNotification({
        type: 'success',
        message: `Código QR vinculado exitosamente a ${updatedParticipant.name} ${updatedParticipant.last_name}`,
      })

      // Move to linked step IMMEDIATELY to prevent any more scans
      setCurrentStep('linked')
      
    } catch (error: any) {
      console.error('Error linking QR code:', error)
      // Reset the processed flag on error so user can retry
      hasProcessedQrRef.current = null
      
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message || ''
      addNotification({
        type: 'error',
        message: errorMessage || 'Error al vincular el código QR. Por favor, intenta nuevamente.',
      })
    }
  }, [currentStep, selectedParticipant, registerParticipantQR, addNotification])

  const handleLinkAnother = useCallback(() => {
    // Clear all participant queries from cache to prevent stale data
    queryClient.removeQueries({ queryKey: ['participant'] })
    
    // Reset all state
    setScannedQrCode(null)
    setSelectedParticipant(null)
    hasProcessedQrRef.current = null
    isResettingRef.current = false
    
    // Change step to show search
    setCurrentStep('search')
    
    // Force remount of SearchParticipantByDni to clear its internal state
    setSearchKey(prev => prev + 1)
  }, [queryClient])

  const handleCloseScanner = () => {
    setCurrentStep('found')
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
