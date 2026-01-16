import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle2, XCircle, Check } from 'lucide-react'
import type { Participant } from '../../../services/api/participantService'

interface ParticipantCardProps {
  participant: Participant
  onActivate: (participant: Participant) => void
  isUpdating?: boolean
}

const ParticipantCard = ({ participant, onActivate, isUpdating = false }: ParticipantCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 border-b border-gray-200 last:border-b-0"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">
            {participant.name} {participant.last_name}
          </h3>
        </div>
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
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm text-gray-800">{participant.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Teléfono</p>
            <p className="text-sm text-gray-800">{participant.celphone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">DNI</p>
            <p className="text-sm font-semibold text-gray-800">{participant.dni}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">RUC</p>
            <p className="text-sm font-semibold text-gray-800">{participant.ruc}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Ubicación</p>
            <p className="text-sm text-gray-800">{participant.location}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {!participant.is_active && (
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onActivate(participant)}
            disabled={isUpdating}
            className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Activando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Activar Participante
              </>
            )}
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default ParticipantCard
