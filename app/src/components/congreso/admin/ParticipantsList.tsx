import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle2, XCircle, Check, Loader2, AlertCircle, Users } from 'lucide-react'
import type { Participant } from '../../../services/api/participantService'
import ParticipantCard from './ParticipantCard'

interface ParticipantsListProps {
  participants: Participant[]
  isLoading?: boolean
  error?: Error | null
  onActivate: (participant: Participant) => void
  updatingParticipantId?: number | null
}

const ParticipantsList = ({ 
  participants, 
  isLoading, 
  error, 
  onActivate,
  updatingParticipantId 
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
                  {!participant.is_active && (
                    <button
                      onClick={() => onActivate(participant)}
                      disabled={updatingParticipantId === participant.id}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Activar participante"
                    >
                      {updatingParticipantId === participant.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </td>
              </motion.tr>
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
            onActivate={onActivate}
            isUpdating={updatingParticipantId === participant.id}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default ParticipantsList
