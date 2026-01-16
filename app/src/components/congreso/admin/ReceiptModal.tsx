import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Download, ExternalLink, Check } from 'lucide-react'
import type { Participant } from '../../../services/api/participantService'

interface ReceiptModalProps {
  participant: Participant | null
  isOpen: boolean
  onClose: () => void
  onActivate?: (participant: Participant) => void
  isUpdating?: boolean
}

const ReceiptModal = ({ participant, isOpen, onClose, onActivate, isUpdating = false }: ReceiptModalProps) => {
  if (!participant || !participant.receipt) return null

  const receiptUrl = participant.receipt.startsWith('http') 
    ? participant.receipt 
    : `${import.meta.env.VITE_API_URL || ''}${participant.receipt}`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 group"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Comprobante de Pago
                    </h2>
                    <p className="text-sm text-gray-600">
                      {participant.name} {participant.last_name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">DNI:</span> {participant.dni}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Email:</span> {participant.email}
                  </p>
                </div>

                {/* Receipt Display */}
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  {receiptUrl.endsWith('.pdf') ? (
                    <iframe
                      src={receiptUrl}
                      className="w-full h-[500px]"
                      title="Comprobante de pago"
                    />
                  ) : (
                    <img
                      src={receiptUrl}
                      alt="Comprobante de pago"
                      className="w-full h-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = `
                            <div class="p-8 text-center">
                              <p class="text-gray-600 mb-4">No se pudo cargar la imagen</p>
                              <a href="${receiptUrl}" target="_blank" rel="noopener noreferrer" 
                                 class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                </svg>
                                Abrir en nueva pestaña
                              </a>
                            </div>
                          `
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  {!participant.is_active && onActivate && (
                    <button
                      onClick={() => onActivate(participant)}
                      disabled={isUpdating}
                      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isUpdating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Activando...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          Activar Participante
                        </>
                      )}
                    </button>
                  )}
                  <div className="flex gap-3 flex-1 justify-end">
                    <a
                      href={receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir en nueva pestaña
                    </a>
                    <a
                      href={receiptUrl}
                      download
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ReceiptModal
