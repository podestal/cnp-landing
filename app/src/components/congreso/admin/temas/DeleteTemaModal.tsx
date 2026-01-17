import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Trash2, Loader2 } from 'lucide-react'
import type { Tema } from '../../../../services/api/temaService'

interface DeleteTemaModalProps {
  isOpen: boolean
  tema: Tema | null
  onClose: () => void
  onConfirm: () => void
  isDeleting?: boolean
}

const DeleteTemaModal = ({ isOpen, tema, onClose, onConfirm, isDeleting = false }: DeleteTemaModalProps) => {
  if (!tema) return null

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
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
                  ¿Eliminar Tema?
                </h2>

                {/* Message */}
                <p className="text-gray-600 text-center mb-2">
                  Estás a punto de eliminar el tema:
                </p>
                <p className="text-lg font-semibold text-gray-800 text-center mb-6">
                  "{tema.title}"
                </p>
                <p className="text-sm text-red-600 text-center mb-6">
                  Esta acción no se puede deshacer.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Eliminando...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        Eliminar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default DeleteTemaModal
