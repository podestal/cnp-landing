import { useState } from 'react'
import { motion } from 'framer-motion'
import SearchParticipantByDni from './SearchParticipantByDni'
import ParticipantFoundCard from './ParticipantFoundCard'
import QrCodeScanner from './QrCodeScanner'
import QrCodeLinked from './QrCodeLinked'
import type { Participant } from '../../../../services/api/participantService'

type Step = 'search' | 'found' | 'scanning' | 'linked'

const RegisterParticipantMain = () => {
  const [currentStep, setCurrentStep] = useState<Step>('search')
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [scannedQrCode, setScannedQrCode] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleParticipantFound = (participant: Participant) => {
    setSelectedParticipant(participant)
    setCurrentStep('found')
  }

  const handleProceedToScan = () => {
    setCurrentStep('scanning')
  }

  const handleQrCodeScanned = (qrCode: string) => {
    setScannedQrCode(qrCode)
    setCurrentStep('linked')
    
    // TODO: Call API to link QR code to participant
    // await linkQrCodeToParticipant(selectedParticipant.id, qrCode)
  }

  const handleLinkAnother = () => {
    setSelectedParticipant(null)
    setScannedQrCode(null)
    setCurrentStep('search')
  }

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
