import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle2, XCircle, Loader2, AlertCircle, Users, Eye } from 'lucide-react'
import type { Participant } from '../../../services/api/participantService'
import ParticipantCard from './ParticipantCard'
import CompanionsDropdown from './CompanionsDropdown'

interface ParticipantsListProps {
  participants: Participant[]
  isLoading?: boolean
  error?: Error | null
  onViewReceipt: (participant: Participant) => void
}

const ParticipantsList = ({ 
  participants, 
  isLoading, 
  error, 
  onViewReceipt
}: ParticipantsListProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Cargando participantes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
        <p className="text-red-600 font-semibold mb-2">Error al cargar participantes</p>
        <p className="text-gray-600">Por favor, intenta nuevamente más tarde.</p>
      </div>
    )
  }

  if (participants.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-semibold mb-2">No se encontraron participantes</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Participante</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Documentos</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {participants.map((participant: Participant, index: number) => (
              <>
                <motion.tr
                  key={participant.id || index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-800">
                      {participant.name} {participant.last_name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-green-600" />
                        {participant.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-green-600" />
                        {participant.celphone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-semibold">DNI:</span> {participant.dni}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">RUC:</span> {participant.ruc}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-green-600" />
                      {participant.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      participant.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {participant.is_active ? (
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.receipt && (
                      <button
                        onClick={() => onViewReceipt(participant)}
                        className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Ver comprobante"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </motion.tr>
                {participant.id && (
                  <tr key={`companions-${participant.id}`}>
                    <td colSpan={6} className="px-0">
                      <CompanionsDropdown participantId={participant.id} />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {participants.map((participant: Participant, index: number) => (
          <ParticipantCard
            key={participant.id || index}
            participant={participant}
            onViewReceipt={onViewReceipt}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default ParticipantsList
