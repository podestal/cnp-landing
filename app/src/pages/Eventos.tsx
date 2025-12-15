import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Calendar, Clock, MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { eventos } from '../components/main/EventosSection'

const Eventos = () => {
  const { id } = useParams<{ id: string }>()
  const eventoId = id ? parseInt(id) : null
  const evento = eventoId ? eventos.find(e => e.id === eventoId) : null

  // If there's an ID and event found, show single event detail
  if (eventoId && evento) {
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
                to="/eventos"
                className="inline-flex items-center gap-2 text-green-300 hover:text-white mb-6 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver a Eventos</span>
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {evento.title}
              </h1>
              <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            </motion.div>
          </div>
        </motion.section>

        {/* Event Detail */}
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
                  src={evento.image}
                  alt={evento.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                
                {/* Date Badge */}
                <div className="absolute top-6 left-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{evento.date}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Event Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Hora</p>
                      <p className="font-semibold text-gray-800">{evento.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Ubicación</p>
                      <p className="font-semibold text-gray-800">{evento.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Sobre el Evento</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                      {evento.description}
                    </p>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {evento.fullDescription}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      </div>
    )
  }

  // Show all events list
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
              Eventos
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Descubre todos los eventos y actividades del Colegio de Notarios de Puno
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Events List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {eventos.map((evento, index) => (
              <motion.article
                key={evento.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
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
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer"
              >
                <motion.div 
                  className="relative h-64 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    src={evento.image}
                    alt={evento.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.15 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">{evento.date}</span>
                    </div>
                  </div>
                </motion.div>
                
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-tight">
                    {evento.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-sm">{evento.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-sm">{evento.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 grow text-sm leading-relaxed line-clamp-3">
                    {evento.description}
                  </p>
                  
                  <Link
                    to={`/eventos/${evento.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 group self-start"
                  >
                    Ver detalles
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

export default Eventos

