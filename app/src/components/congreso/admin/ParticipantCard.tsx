import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle2, XCircle, Eye, FileText } from 'lucide-react'
import type { Participant } from '../../../services/api/participantService'
import CompanionsDropdown from './CompanionsDropdown'

interface ParticipantCardProps {
  participant: Participant
  onViewReceipt: (participant: Participant) => void
}

const ParticipantCard = ({ participant, onViewReceipt }: ParticipantCardProps) => {
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

        {/* Comprobante Section */}
        {participant.receipt && (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-600" />
              <p className="text-sm font-medium text-green-800">Comprobante disponible</p>
            </div>
            <button
              onClick={() => onViewReceipt(participant)}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              title="Ver comprobante"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Companions Dropdown */}
      {participant.id && (
        <CompanionsDropdown participantId={participant.id} />
      )}
    </motion.div>
  )
}

export default ParticipantCard
