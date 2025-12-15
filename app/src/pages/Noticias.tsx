import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import { noticias } from '../components/main/NoticiasSection'

const Noticias = () => {
  const { id } = useParams<{ id: string }>()
  const noticiaId = id ? parseInt(id) : null
  const noticia = noticiaId ? noticias.find(n => n.id === noticiaId) : null

  // If there's an ID and noticia found, show single noticia detail
  if (noticiaId && noticia) {
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
              className="max-w-4xl mx-auto"
            >
              <Link
                to="/noticias"
                className="inline-flex items-center gap-2 text-green-300 hover:text-white mb-6 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver a Noticias</span>
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {noticia.title}
              </h1>
              <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            </motion.div>
          </div>
        </motion.section>

        {/* Noticia Detail */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-80 md:h-96 overflow-hidden">
                <motion.img
                  src={noticia.image}
                  alt={noticia.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg">
                    {noticia.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Date */}
                <div className="flex items-center gap-2 text-green-600 mb-6">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{noticia.date}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 leading-tight">
                  {noticia.title}
                </h2>

                {/* Content Text */}
                <div className="prose prose-lg max-w-none">
                  {noticia.fullContent.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-gray-700 text-base md:text-lg leading-relaxed mb-6"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      </div>
    )
  }

  // Show all noticias list
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
              Noticias
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Mantente al día con las últimas noticias y eventos del Colegio de Notarios de Puno
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Noticias List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {noticias.map((noticia, index) => (
              <motion.article
                key={noticia.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-gray-100"
              >
                <motion.div 
                  className="relative h-64 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    src={noticia.image}
                    alt={noticia.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.25 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                      {noticia.category}
                    </span>
                  </div>
                </motion.div>
                
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-2 text-green-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{noticia.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {noticia.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 grow line-clamp-3">
                    {noticia.content}
                  </p>
                  
                  <Link
                    to={`/noticias/${noticia.id}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 group self-start"
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
    </div>
  )
}

export default Noticias

