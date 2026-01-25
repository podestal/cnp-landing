import { motion } from 'framer-motion'
import { CheckCircle2, User, Mail, Phone, MapPin, CreditCard } from 'lucide-react'
import type { Participant } from '../../../../services/api/participantService'

interface ParticipantFoundCardProps {
  participant: Participant
  onProceedToScan: () => void
}

const ParticipantFoundCard = ({ participant, onProceedToScan }: ParticipantFoundCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-green-500"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Participante Encontrado
          </h3>
          <p className="text-sm text-gray-600">Verifica los datos antes de escanear el QR</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <User className="w-5 h-5 text-gray-600 shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Nombre Completo</p>
            <p className="font-semibold text-gray-800">
              {participant.name} {participant.last_name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <CreditCard className="w-5 h-5 text-gray-600 shrink-0" />
          <div>
            <p className="text-xs text-gray-500">DNI</p>
            <p className="font-semibold text-gray-800">{participant.dni}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-600 shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-semibold text-gray-800">{participant.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Phone className="w-5 h-5 text-gray-600 shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Teléfono</p>
            <p className="font-semibold text-gray-800">{participant.celphone}</p>
          </div>
        </div>

        {participant.location && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Ubicación</p>
              <p className="font-semibold text-gray-800">{participant.location}</p>
            </div>
          </div>
        )}

        {participant.qr_code && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 font-medium">
              ⚠️ Este participante ya tiene un código QR asignado
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onProceedToScan}
        className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" />
        Proceder a Escanear QR
      </button>
    </motion.div>
  )
}

export default ParticipantFoundCard
