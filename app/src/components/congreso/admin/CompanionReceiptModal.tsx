import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Download, ExternalLink, CheckCircle2, Loader2 } from 'lucide-react'
import type { Companion } from '../../../services/api/companionService'
import { useUpdateCompanion } from '../../../hooks/api/companion/useUpdateCompanion'
import { useNotificationStore } from '../../../utils/notificationStore'

interface CompanionReceiptModalProps {
  companion: Companion | null
  isOpen: boolean
  onClose: () => void
}

const CompanionReceiptModal = ({ companion, isOpen, onClose }: CompanionReceiptModalProps) => {
  if (!companion || !companion.receipt) return null

  const updateCompanion = useUpdateCompanion()
  const addNotification = useNotificationStore((state: ReturnType<typeof useNotificationStore.getState>) => state.addNotification)

  const receiptUrl = companion.receipt.startsWith('http') 
    ? companion.receipt 
    : `${import.meta.env.VITE_API_URL || ''}${companion.receipt}`

  const handleActivate = async () => {
    if (!companion.id) return

    try {
      await updateCompanion.mutateAsync({
        id: companion.id,
        data: { is_active: true }
      })
      addNotification({
        type: 'success',
        message: `Acompañante ${companion.first_name} ${companion.last_name} activado exitosamente`,
      })
      onClose()
    } catch (error) {
      console.error('Error activating companion:', error)
      addNotification({
        type: 'error',
        message: 'Error al activar el acompañante. Por favor, intenta nuevamente.',
      })
    }
  }

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
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Comprobante de Pago - Acompañante
                    </h2>
                    <p className="text-sm text-gray-600">
                      {companion.first_name} {companion.last_name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Receipt Content */}
              <div className="flex-1 overflow-auto p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">DNI</p>
                      <p className="font-semibold text-gray-800">{companion.dni}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Estado</p>
                      <p className={`font-semibold ${companion.is_active ? 'text-green-600' : 'text-red-600'}`}>
                        {companion.is_active ? 'Activo' : 'Inactivo'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Receipt Preview */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  {companion.receipt.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <img
                      src={receiptUrl}
                      alt="Comprobante de pago"
                      className="w-full h-auto max-h-[60vh] object-contain"
                    />
                  ) : (
                    <iframe
                      src={receiptUrl}
                      className="w-full h-[60vh] border-0"
                      title="Comprobante de pago"
                    />
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-200 flex flex-col gap-3">
                <div className="flex gap-3">
                  <a
                    href={receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Abrir en nueva pestaña
                  </a>
                  <a
                    href={receiptUrl}
                    download
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </a>
                </div>
                {!companion.is_active && (
                  <button
                    onClick={handleActivate}
                    disabled={updateCompanion.isPending}
                    className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {updateCompanion.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Activando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Activar Acompañante
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CompanionReceiptModal
