import { motion } from 'framer-motion'
import { CheckCircle2, QrCode, X } from 'lucide-react'

interface QrCodeLinkedProps {
  participantName: string
  qrCode: string
  onClose: () => void
  onLinkAnother: () => void
}

const QrCodeLinked = ({ participantName, qrCode, onClose, onLinkAnother }: QrCodeLinkedProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-green-500"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Código QR Vinculado!
        </h3>
        <p className="text-gray-600">
          El código QR ha sido vinculado exitosamente al participante
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Participante</p>
            <p className="font-semibold text-gray-800">{participantName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Código QR</p>
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-gray-600" />
              <p className="font-mono font-semibold text-gray-800 break-all">{qrCode}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onLinkAnother}
          className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Vincular Otro
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}

export default QrCodeLinked
