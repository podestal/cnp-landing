import { motion } from 'framer-motion'
import { CheckCircle2, Calendar, MapPin, Building, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CongresoConfirmationPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              ¡Inscripción Exitosa!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Tu inscripción al XVIII Congreso Nacional de Notarios ha sido registrada correctamente. 
              Te contactaremos pronto con más información.
            </p>
          </div>

          {/* Event Details */}
          <div className="bg-green-50 rounded-lg p-5 sm:p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Detalles del Evento
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Fecha</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">5 - 7 de Febrero, 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Ubicación</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    Hotel GHL Gran Hotel Lago Titicaca, Isla Esteves – Puno
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Building className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Organiza</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">Colegio de Notarios de Puno</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5 mb-8">
            <p className="text-sm text-blue-800">
              <strong>Nota importante:</strong> Guarda este comprobante. Recibirás un correo de confirmación 
              con todos los detalles de tu inscripción en breve.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/congreso2025')}
              className="cursor-pointer flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Formulario
            </button>
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Ir al Inicio
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CongresoConfirmationPage
