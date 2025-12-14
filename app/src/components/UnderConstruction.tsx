import { motion } from 'framer-motion'
import { Wrench, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface UnderConstructionProps {
  pageName: string
}

const UnderConstruction = ({ pageName }: UnderConstructionProps) => {
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
              {pageName}
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Estamos trabajando en esta página
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-16 h-16 text-green-600" />
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Página en Construcción
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Estamos trabajando arduamente para brindarte la mejor experiencia. 
              Esta sección estará disponible muy pronto.
            </p>

            <p className="text-base text-gray-500 mb-8">
              Mientras tanto, puedes explorar otras secciones de nuestro sitio web.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver al Inicio</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default UnderConstruction

