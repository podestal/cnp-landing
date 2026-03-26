import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Calendar, ArrowLeft } from 'lucide-react'
import { comunicados } from '../components/main/ComunicadosSection'
import Comunicado from '../components/comunicado/Comunicado'

const Comunicados = () => {
  const { id } = useParams<{ id: string }>()
  const comunicadoId = id ? parseInt(id) : null
  const comunicado = comunicadoId ? comunicados.find(c => c.id === comunicadoId) : null

  // If there's an ID and comunicado found, show single comunicado detail
  if (comunicadoId && comunicado) {
    return (
      <Comunicado
        comunicado={comunicado}
        showButton={Boolean(comunicado.button)}
        buttonLabel={comunicado.buttonLabel || 'Descargar comunicado'}
        buttonHref={comunicado.buttonUrl}
        buttonDownload
      />
    )
  }

  // Show all comunicados list
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-linear-to-br from-green-600 via-green-700 to-green-800 text-white pt-28 pb-20 md:pt-36 md:pb-28"
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
              Comunicados
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Mantente informado sobre las últimas noticias y comunicados del Colegio de Notarios de Puno
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Comunicados List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {comunicados.map((comunicado, index) => (
              <motion.article
                key={comunicado.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer"
              >
                <motion.div 
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    src={comunicado.image}
                    alt={comunicado.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent" />
                </motion.div>
                
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-2 text-green-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{comunicado.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">
                    {comunicado.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 grow line-clamp-4">
                    {comunicado.content}
                  </p>
                  
                  <Link
                    to={`/comunicados/${comunicado.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 group self-start"
                  >
                    Leer más
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Comunicados

