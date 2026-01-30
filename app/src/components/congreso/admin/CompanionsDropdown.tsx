import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, User, FileText, Eye, CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react'
import { useGetCompanionsByParticipant } from '../../../hooks/api/companion/useGetCompanionsByParticipant'
import CompanionReceiptModal from './CompanionReceiptModal'
import type { Companion } from '../../../services/api/companionService'

interface CompanionsDropdownProps {
  participantId: number
}

const CompanionsDropdown = ({ participantId }: CompanionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  
  const { data: companions, isLoading, error } = useGetCompanionsByParticipant({
    participantId,
    enabled: isOpen,
  })

  const handleViewReceipt = (companion: Companion) => {
    setSelectedCompanion(companion)
    setIsReceiptModalOpen(true)
  }

  return (
    <>
      <div className="border-t border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-semibold text-gray-700">
            Acompañantes {companions && companions.length > 0 && `(${companions.length})`}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
                    <span className="ml-2 text-gray-600">Cargando acompañantes...</span>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-8 text-red-600">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>Error al cargar acompañantes</span>
                  </div>
                ) : !companions || companions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay acompañantes registrados</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {companions.map((companion: Companion) => (
                      <motion.div
                        key={companion.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">
                              {companion.first_name} {companion.last_name}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                <span>DNI: {companion.dni}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                            companion.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {companion.is_active ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                Activo
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" />
                                Inactivo
                              </>
                            )}
                          </span>
                        </div>

                        {companion.receipt && (
                          <button
                            onClick={() => handleViewReceipt(companion)}
                            className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            Ver Comprobante
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Companion Receipt Modal */}
      <CompanionReceiptModal
        companion={selectedCompanion}
        isOpen={isReceiptModalOpen}
        onClose={() => {
          setIsReceiptModalOpen(false)
          setSelectedCompanion(null)
        }}
      />
    </>
  )
}

export default CompanionsDropdown
