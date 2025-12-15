import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, MapPin, Clock } from 'lucide-react'

export const eventos = [
  {
    id: 1,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-1.jpeg',
    title: 'Seminario de Actualización Notarial 2025',
    date: '15 de Marzo, 2025',
    time: '09:00 AM - 05:00 PM',
    location: 'Auditorio del Colegio de Notarios de Puno',
    description: 'Seminario especializado en actualización de normativa notarial, nuevas disposiciones legales y mejores prácticas en el ejercicio notarial.',
    fullDescription: 'Este seminario está diseñado para proporcionar a los notarios las herramientas y conocimientos necesarios para mantenerse actualizados con las últimas normativas y disposiciones legales. Se abordarán temas como la digitalización de procesos notariales, nuevas regulaciones en materia de contratos, y las mejores prácticas para garantizar la seguridad jurídica en los actos notariales. El evento contará con la participación de expertos en derecho notarial y representantes de instituciones relacionadas.',
  },
  {
    id: 2,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-2.jpeg',
    title: 'Asamblea General Anual 2025',
    date: '20 de Abril, 2025',
    time: '10:00 AM - 02:00 PM',
    location: 'Sede del Colegio de Notarios de Puno',
    description: 'Reunión anual de todos los miembros del colegio para tratar temas importantes, elecciones y propuestas para el próximo período.',
    fullDescription: 'La Asamblea General Anual es el evento más importante del año para el Colegio de Notarios de Puno. En esta reunión se tratarán temas fundamentales como la presentación del informe anual de actividades, la aprobación del presupuesto para el próximo año, elecciones de nuevos miembros de la junta directiva, y la discusión de propuestas para mejorar los servicios notariales. Todos los miembros del colegio están invitados a participar y expresar sus opiniones.',
  },
  {
    id: 3,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-3.jpeg',
    title: 'Taller de Herramientas Digitales para Notarios',
    date: '5 de Mayo, 2025',
    time: '02:00 PM - 06:00 PM',
    location: 'Sala de Capacitación del Colegio',
    description: 'Taller práctico sobre el uso de herramientas digitales y plataformas tecnológicas para optimizar el trabajo notarial y mejorar la atención al público.',
    fullDescription: 'En este taller práctico, los notarios aprenderán a utilizar las últimas herramientas digitales disponibles para el ejercicio notarial. Se cubrirán temas como la firma electrónica, la gestión documental digital, plataformas de consulta legal en línea, y sistemas de gestión de clientes. El taller incluirá sesiones prácticas donde los participantes podrán experimentar con las herramientas y resolver dudas con los instructores especializados.',
  },
  {
    id: 4,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-4.jpeg',
    title: 'Conferencia sobre Ética Notarial y Buenas Prácticas',
    date: '12 de Junio, 2025',
    time: '09:00 AM - 01:00 PM',
    location: 'Auditorio Principal - Universidad Nacional del Altiplano',
    description: 'Conferencia magistral sobre ética profesional, código de conducta notarial y las mejores prácticas para mantener la integridad y prestigio de la profesión.',
    fullDescription: 'Esta conferencia abordará los principios fundamentales de la ética notarial y su importancia en el ejercicio profesional. Se analizarán casos prácticos, situaciones complejas que pueden presentarse en el día a día, y las mejores formas de resolverlas manteniendo siempre los más altos estándares éticos. La conferencia será dictada por reconocidos expertos en ética profesional y contará con la participación de representantes del Tribunal de Honor del Colegio.',
  },
  {
    id: 5,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-1.jpeg',
    title: 'Jornada de Actualización en Derecho Registral',
    date: '25 de Julio, 2025',
    time: '08:00 AM - 04:00 PM',
    location: 'Centro de Convenciones de Puno',
    description: 'Jornada completa de actualización sobre las últimas modificaciones en la legislación registral, procedimientos SUNARP y nuevas normativas que afectan el trabajo notarial.',
    fullDescription: 'Esta jornada está dirigida a todos los notarios que deseen actualizarse en materia registral. Se revisarán las últimas modificaciones legislativas, cambios en los procedimientos de SUNARP, nuevas modalidades de inscripción, y casos prácticos de resolución de problemas comunes en el registro de propiedades. La jornada incluirá sesiones de preguntas y respuestas con expertos registrales y representantes de SUNARP.',
  },
]

const EventosSection = () => {
  return (
    <section className="relative z-20 bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Próximos Eventos
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente informado sobre los eventos y actividades del Colegio de Notarios de Puno
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {eventos.slice(0, 2).map((evento, index) => (
            <motion.article
              key={evento.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
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
              
              <div className="p-6 md:p-8 flex flex-col grow">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {evento.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm md:text-base">{evento.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm md:text-base">{evento.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 grow text-sm md:text-base leading-relaxed">
                  {evento.description}
                </p>
                
                <Link
                  to={`/eventos/${evento.id}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 group self-start"
                >
                  Ver más detalles
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200 group"
          >
            Ver todos los eventos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default EventosSection

