import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Building } from 'lucide-react'

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
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
            onClick={handleClose}
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
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 group"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>

              {/* Header with image background */}
              <div 
                className="text-white p-6 sm:p-8 pb-6 relative overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url(https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/pop-up/Screen%20Shot%202026-01-10%20at%206.34.16%20AM.png)'
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
                    XVIII Congreso Nacional de Notarios
                  </h2>
                  <p className="text-white/90 text-center text-sm sm:text-base">
                    "Notariado y jurisdicción voluntaria hacia una justicia descongestionada en una época de cambios"
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8 overflow-y-auto">
                <div className="space-y-4 sm:space-y-5 mb-6">
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
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">Hotel GHL Gran Hotel Lago Titicaca, Isla Esteves – Puno</p>
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

                {/* <div className="bg-green-50 rounded-lg p-4 sm:p-5 mb-6">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Únete a la <span className="font-semibold text-green-700">Convención Notarial 2025</span>, el evento más importante del año para profesionales del notariado. Contaremos con conferencias magistrales, talleres especializados y oportunidades de networking.
                  </p>
                </div> */}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      window.open('https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/pop-up/BROCHURE%20OFICIAL%20CONGRESO.pdf', '_blank')
                    }}
                    className="cursor-pointer flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Más Información
                  </button>
                  <button
                    onClick={handleClose}
                    className="cursor-pointer flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cerrar
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

export default PopupModal

