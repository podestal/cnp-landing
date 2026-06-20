import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, MapPin, Clock } from 'lucide-react'

export const eventos = [
  {
    id: 7,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-2.jpeg',
    title: 'Tributación en la Transferencia de Bienes',
    subtitle: 'Evento especial para Notarios y Operadores Jurídicos',
    tagline: 'Preguntas que inquietan... Respuestas que iluminan.',
    date: 'Sábado 20 de Junio, 2026',
    time: '9:00 a.m. – 11:00 a.m.',
    location: 'Modalidad Virtual',
    description: 'El Colegio de Notarios de Puno invita a notarios y operadores jurídicos a un evento especial sobre tributación en la transferencia de bienes, con el ponente Walker Villanueva.',
    fullDescription: 'Será un espacio para resolver dudas críticas y fortalecer la seguridad jurídica en operaciones tributarias que se verifican en el ejercicio de la función notarial. No será un curso más: aprenderás de casos reales y obtendrás criterios claros frente a SUNAT y demás entes de la administración tributaria.',
    isExtended: true,
    speaker: {
      name: 'Walker Villanueva',
      credentials: [
        'Máster en Asesoría Fiscal por la Universidad de Navarra (España).',
        'Estudios de Postgrado en Tributación Internacional por la Universidad Austral (Argentina) y la Universidad de Leiden (Holanda).',
        'Profesor de la Maestría en Tributación de la Universidad de Lima y Maestría en Derecho Tributario de la PUCP.',
        'Autor de diversas obras especializadas en Derecho Tributario.',
        'Socio del estudio de abogados Philipi Prietocarrizosa Ferrero DU & Uría PPU, experto en consultoría tributaria y en operaciones de planeamiento tributario nacional e internacional.',
      ],
    },
    questions: [
      '¿Qué pasa si el notario eleva una escritura con un voucher de impuesto a la renta ya usado en otra operación?',
      '¿Cómo debe actuar el notario cuando el contribuyente declara un precio notoriamente inferior al valor real del inmueble para evitar la bancarización?',
      '¿Qué responsabilidad tiene el notario si formaliza una transferencia con constancias municipales poco claras sobre predial, alcabala o patrimonio vehicular?',
      '¿Debe el notario exigir resolución oficial de prescripción del impuesto a la renta por ganancia de capital, o basta con documentos que acrediten el transcurso del plazo?',
      '¿Cómo puede el notario detectar que una persona ha realizado varias ventas de inmuebles en un mismo año y que, por tanto, está afecta a renta de tercera categoría?',
    ],
    benefits: [
      {
        title: 'Resolverás problemas reales',
        description: 'Las preguntas que se absolverán son los verdaderos problemas que enfrentamos en la práctica.',
      },
      {
        title: 'Casos prácticos',
        description: 'Aprenderás de casos reales y te llevarás advertencias prácticas para tu ejercicio profesional.',
      },
      {
        title: 'Criterios sólidos',
        description: 'Obtendrás criterios claros y defensas sólidas frente a SUNAT y demás entes encargados de la administración de tributos.',
      },
    ],
    cost: {
      amount: 'S/ 50',
      notes: [
        'Incluye certificado',
        'Válido para todos los concursos de acceso al notariado.',
      ],
    },
    modality: 'Virtual',
    certification: 'A nombre del Colegio de Notarios de Puno',
    registrationNote: 'Inscríbete ahora mediante el link o escaneando el código QR.',
    closingMessage: 'Este no será un curso más. Será un espacio para resolver dudas críticas y fortalecer la seguridad jurídica en operaciones tributarias que se verifican en el ejercicio de la función notarial.',
  },
  {
    id: 6,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/pop-up/ScreenShot2026-01-10at6.34.16A.jpeg',
    title: 'XVIII Congreso Nacional del Notariado Peruano',
    date: '5 - 7 de Febrero, 2026',
    time: 'Varios horarios',
    location: 'Hotel GHL Gran Hotel Lago Titicaca, Isla Esteves – Puno',
    description: 'Notariado y jurisdicción voluntaria: Hacia una justicia descongestionada en una época de cambios. Organizado por el Colegio de Notarios de Puno.',
    fullDescription: 'El XVIII Congreso Nacional del Notariado Peruano reunirá a notarios de todo el país para abordar temas sobre administración preventiva de justicia, jurisdicción voluntaria y nuevas competencias del notariado. Incluye actividades académicas, visitas culturales, trabajo en comisiones y cena de gala.',
    isCongreso: true,
  },
]

const EventosSection = () => {
  return (
    <section className="relative z-20 bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Eventos
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
              viewport={{ once: true, margin: '-100px' }}
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
                  viewport={{ once: true, margin: '-100px' }}
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
                {'subtitle' in evento && evento.subtitle && (
                  <p className="text-sm font-medium text-green-600 mb-2">{evento.subtitle}</p>
                )}
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
          viewport={{ once: true, margin: '-100px' }}
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

