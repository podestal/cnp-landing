import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Newspaper } from 'lucide-react'

export const noticias = [
  {
    id: 1,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-1.jpeg',
    title: 'Colegio de Notarios de Puno celebra 50 años de servicio',
    content: 'El Colegio de Notarios de Puno conmemora cinco décadas de servicio a la comunidad, destacando su compromiso con la excelencia notarial y el desarrollo legal de la región.',
    fullContent: 'El Colegio de Notarios de Puno conmemora cinco décadas de servicio a la comunidad, destacando su compromiso con la excelencia notarial y el desarrollo legal de la región. Durante estos 50 años, la institución ha sido un pilar fundamental en la garantía de la seguridad jurídica de los ciudadanos de Puno, brindando servicios notariales de calidad y contribuyendo al desarrollo económico y social de la región.\n\nA lo largo de su historia, el Colegio ha mantenido los más altos estándares de profesionalismo y ética, formando a generaciones de notarios comprometidos con el servicio público. Este aniversario representa un hito importante que refleja la confianza de la comunidad en la labor notarial y el compromiso continuo con la excelencia.',
    date: '20 de Diciembre, 2024',
    category: 'Aniversario',
  },
  {
    id: 2,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-2.jpeg',
    title: 'Nuevas normativas para la legalización de documentos',
    content: 'Se implementan nuevas normativas que mejoran los procesos de legalización de documentos, facilitando el trámite para los ciudadanos y garantizando mayor seguridad jurídica.',
    fullContent: 'Se implementan nuevas normativas que mejoran los procesos de legalización de documentos, facilitando el trámite para los ciudadanos y garantizando mayor seguridad jurídica. Estas actualizaciones responden a las necesidades modernas del ejercicio notarial y buscan agilizar los procesos sin comprometer la seguridad y validez legal de los documentos.\n\nLas nuevas normativas incluyen mejoras en los procedimientos de verificación de identidad, digitalización de procesos, y nuevos protocolos para la legalización de documentos que serán utilizados en el extranjero. El Colegio ha trabajado en conjunto con las autoridades competentes para asegurar que estas normativas beneficien tanto a los notarios como a los ciudadanos que requieren de sus servicios.',
    date: '18 de Diciembre, 2024',
    category: 'Normativa',
  },
  {
    id: 3,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-3.jpeg',
    title: 'Taller de actualización profesional para notarios',
    content: 'Se realizó exitosamente el taller de actualización profesional dirigido a todos los notarios del colegio, abordando temas de actualidad jurídica y mejores prácticas.',
    fullContent: 'Se realizó exitosamente el taller de actualización profesional dirigido a todos los notarios del colegio, abordando temas de actualidad jurídica y mejores prácticas. El evento contó con la participación de destacados juristas y expertos en derecho notarial, quienes compartieron sus conocimientos y experiencias con los asistentes.\n\nDurante el taller se abordaron temas como las últimas modificaciones en la legislación notarial, nuevas interpretaciones jurisprudenciales, casos prácticos de resolución de problemas comunes, y estrategias para mejorar la atención al público. Los participantes tuvieron la oportunidad de interactuar con los expositores y resolver dudas sobre situaciones específicas que enfrentan en su ejercicio profesional diario.',
    date: '12 de Diciembre, 2024',
    category: 'Capacitación',
  },
  {
    id: 4,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-4.jpeg',
    title: 'Reconocimiento a notarios destacados del año',
    content: 'El Colegio reconoce la labor destacada de notarios que han demostrado excelencia en su servicio durante el año, contribuyendo al prestigio de la institución.',
    fullContent: 'El Colegio reconoce la labor destacada de notarios que han demostrado excelencia en su servicio durante el año, contribuyendo al prestigio de la institución. Este reconocimiento se otorga a aquellos profesionales que han destacado por su compromiso, ética profesional, y contribución al desarrollo del notariado en la región.\n\nLos criterios para este reconocimiento incluyen la calidad del servicio prestado, la puntualidad en el cumplimiento de obligaciones, la participación activa en actividades del colegio, y el compromiso con la formación continua. Este reconocimiento no solo honra a los notarios destacados, sino que también inspira a otros miembros del colegio a mantener los más altos estándares de excelencia profesional.',
    date: '10 de Diciembre, 2024',
    category: 'Reconocimiento',
  },
]

const NoticiasSection = () => {
  return (
    <section className="relative z-20 bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-green-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Noticias
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente al día con las últimas noticias y eventos del Colegio de Notarios de Puno
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {noticias.slice(0, 4).map((noticia, index) => (
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200 group"
          >
            Ver todas las noticias
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default NoticiasSection

