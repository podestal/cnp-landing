import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'

const comunicados = [
  {
    id: 1,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-1.jpeg',
    title: 'Nuevo Reglamento de Notarios 2024',
    content: 'Se informa a todos los notarios del colegio sobre la actualización del reglamento interno que entrará en vigencia a partir del próximo mes. Este nuevo reglamento incluye mejoras en los procesos de legalización y certificación de documentos.',
    date: '15 de Diciembre, 2024',
  },
  {
    id: 2,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-2.jpeg',
    title: 'Capacitación en Herramientas Digitales',
    content: 'El Colegio de Notarios de Puno invita a todos sus miembros a participar en la capacitación sobre herramientas tecnológicas para la gestión notarial. La sesión se realizará el próximo mes y cubrirá temas de digitalización y firma electrónica.',
    date: '10 de Diciembre, 2024',
  },
  {
    id: 3,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-3.jpeg',
    title: 'Asamblea General Anual 2024',
    content: 'Convocamos a todos los notarios a la Asamblea General Anual que se llevará a cabo el próximo mes. En esta reunión se tratarán temas importantes sobre el funcionamiento del colegio, elecciones y propuestas para el próximo año.',
    date: '5 de Diciembre, 2024',
  },
]

const ComunicadosSection = () => {
  return (
    <section className="relative z-20 bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comunicados
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Mantente informado sobre las últimas noticias y comunicados del Colegio de Notarios de Puno
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comunicados.map((comunicado, index) => (
            <motion.article
              key={comunicado.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
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
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
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
                  to="/comunicados"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 group self-start"
                >
                  Leer más
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComunicadosSection

