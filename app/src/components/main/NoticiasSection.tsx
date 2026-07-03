import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Newspaper } from 'lucide-react'

export const noticias = [
  {
    id: 2,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/noticias/congreso-virtual-junio.png',
    title: 'Éxito del evento académico «Tributación en la Transferencia de Bienes»',
    content: 'El Colegio de Notarios de Puno desarrolló con notable éxito una jornada especializada que congregó a notarios del Perú, colaboradores notariales y operadores jurídicos, con la participación del expositor Walker Villanueva.',
    fullContent: `El pasado 20 de junio, el Colegio de Notarios de Puno desarrolló con notable éxito el evento académico "Tributación en la Transferencia de Bienes", una jornada especializada que congregó a notarios del Perú, colaboradores notariales y operadores jurídicos interesados en fortalecer sus conocimientos sobre los principales aspectos tributarios vinculados a la transferencia de bienes.

La organización de este importante evento fue impulsada por el decano del Colegio de Notarios de Puno, Dr. Helard Medina Cáceres, junto con su Junta Directiva, reafirmando su compromiso con la capacitación permanente y el fortalecimiento institucional del notariado peruano.

La destacada participación del expositor Walker Villanueva permitió absolver inquietudes frecuentes de la práctica notarial y brindar herramientas actualizadas para una adecuada actuación profesional, contribuyendo al fortalecimiento de la seguridad jurídica y al cumplimiento de las obligaciones tributarias.

La amplia acogida y el interés de los asistentes ratificaron el compromiso del notariado nacional con la capacitación continua y la excelencia en el ejercicio de la función notarial en el Perú.`,
    date: '20 de Junio, 2026',
    category: 'Evento',
    youtubeId: '9e6dVZS9YdI',
  },
  {
    id: 1,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/noticias/Screen%20Shot%202026-01-18%20at%206.59.22%20AM.png',
    title: "Campaña 'EL NOTARIO EN TU BARRIO' - Orientación jurídica notarial gratuita",
    content: 'Con el firme compromiso de fortalecer la seguridad jurídica y promover el ejercicio pleno de los derechos ciudadanos, el Colegio de Notarios de Puno impulsa la campaña informativa y de orientación jurídica notarial gratuita "EL NOTARIO EN TU BARRIO", con el auspicio de la Junta de Decanos de los Colegios de Notarios del Perú.',
    fullContent: 'Campaña informativa y de orientación jurídica notarial gratuita\n"EL NOTARIO EN TU BARRIO"\n\nCon el firme compromiso de fortalecer la seguridad jurídica y promover el ejercicio pleno de los derechos ciudadanos, el Colegio de Notarios de Puno impulsa la campaña informativa y de orientación jurídica notarial gratuita "EL NOTARIO EN TU BARRIO", con el auspicio de la Junta de Decanos de los Colegios de Notarios del Perú. Esta iniciativa busca acercar el servicio notarial a la población, brindando información clara, accesible y confiable sobre los principales actos y procedimientos legales que forman parte de la vida cotidiana de las personas.\n\nLa campaña tiene como objetivo principal orientar a los ciudadanos en temas fundamentales como la formalización de la propiedad, otorgamiento de testamentos, constitución de empresas, otorgamiento de poderes, contratos, sucesiones intestadas, reconocimiento de uniones de hecho, matrimonio civil en sede notarial, separación convencional y divorcio ulterior en sede notarial, prevención de fraudes y protección del patrimonio, entre otros. A través de estas campañas informativas y de orientación jurídica notarial gratuita, los notarios del Perú cumplen su rol de asesoramiento imparcial e independiente, propio del notariado adscrito al Sistema Notarial Latino.\n\nEsta labor resulta especialmente relevante para los sectores más vulnerables, quienes con frecuencia desconocen los mecanismos legales disponibles para proteger sus derechos. Al brindar orientación preventiva, la función notarial contribuye al orden social, a la confianza en las instituciones y al desarrollo económico del país.\n\nPor otro lado, la campaña informativa y de orientación jurídica notarial gratuita "EL NOTARIO EN TU BARRIO" reafirma el papel del notariado como aliado estratégico del Estado y de la ciudadanía, promoviendo una cultura de legalidad, inclusión y seguridad jurídica. De esta manera, se fortalece la convivencia social y se impulsa una sociedad más justa, informada y responsable en el ejercicio de sus derechos y obligaciones.\n\nEstas actividades del notariado peruano se realizaron desde el año 2024, en las provincias de El Collao, Lampa, San Román y otras, en la región de Puno, con masiva concurrencia de usuarios del servicio público notarial. Asimismo, participan diversas instituciones públicas, como SUNARP (Registros Públicos), COFOPRI, SUNAT, Ministerio de Relaciones Exteriores, MIGRACIONES, Ministerio de la Producción a través del Programa Nacional "Tu Empresa", Subgerencia de Saneamiento de la Propiedad Agraria y Catastro Rural del Gobierno Regional de Puno, las subgerencias de catastro de las municipalidades de la jurisdicción, entre otras.',
    date: '15 de Enero, 2025',
    category: 'Campaña',
  },
]

const NoticiasSection = () => {
  return (
    <section className="relative z-20 bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
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
          {noticias.map((noticia, index) => (
            <motion.article
              key={noticia.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
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
          viewport={{ once: true, margin: '-100px' }}
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

