import { motion } from 'framer-motion'
import { Fingerprint } from 'lucide-react'

const Servicios = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white pt-28 pb-20 md:pt-36 md:pb-28"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Servicios
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Conoce los servicios que ofrecemos en el Colegio de Notarios de Puno
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Biometric Verification Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-50 py-16 md:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Fingerprint className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  VERIFICACIÓN BIOMÉTRICA
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-base md:text-lg leading-relaxed">
                  El <span className="font-semibold text-green-600">Servicio de Verificación Biométrica (SVB)</span> es un servicio que brinda la RENIEC sobre la base del Sistema Automático de Identificación de Impresiones Dactilares y ha permitido la reducción de los actos delictivos al momento de realizar transacciones.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed">
                  Este servicio es un mecanismo para mejorar la seguridad de la información así como proveer a la población de una herramienta accesible que garantice la integridad de las personas que realizan transacciones económicas, principalmente las que necesitan la intervención de los Notarios Públicos (Compra venta de bienes muebles e inmuebles, cartas poder, permisos de viajes de menores).
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Servicios

