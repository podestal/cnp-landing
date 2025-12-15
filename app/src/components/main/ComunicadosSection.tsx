import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'

export const comunicados = [
  {
    id: 1,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-1.jpeg',
    title: 'LA JUNTA DE DECANOS DE LOS COLEGIOS DE NOTARIOS DEL PERU INFORMA A LA COLECTIVIDAD',
    content: 'El notariado peruano encargado, por ley, para dar fe y velar por la seguridad jurídica de los contratos de los ciudadanos, hace de conocimiento de la opinión publica el grave riesgo que se generará con la entrada en vigor del nuevo Régimen de Garantías Mobiliarias – Decreto Legislativo 1400, prevista para el 3 de marzo de 2025...',
    date: '27 de Febrero, 2025',
    fullContent: `El notariado peruano encargado, por ley, para dar fe y velar por la seguridad jurídica de los contratos de los ciudadanos, hace de conocimiento de la opinión publica el grave riesgo que se generará con la entrada en vigor del nuevo Régimen de Garantías Mobiliarias – Decreto Legislativo 1400, prevista para el 3 de marzo de 2025, en razón de lo dispuesto por la Resolución N° 0011-2025-SUNARP/SN.

Esta nueva ley constituye un cambio radical en el país respecto de la formalidad para constituir las garantías mobiliarias, así como de la publicidad de las mismas y de su ejecución. Esta modalidad pone en serio riesgo la seguridad jurídica de dichas garantías al abrirse la posibilidad de constitución de las mismas sin la intervención notarial que garantice la identidad, la capacidad, la voluntad y el conocimiento de los intervinientes; al prescindirse del instrumento notarial protocolar y del filtro de legalidad que supone la calificación registral como requisito para la inscripción de la publicidad de las referidas garantías mobiliarias, lo que puede ocasionar ejecuciones extrajudiciales impugnables en la vía judicial.

La eliminación de los filtros antes indicados supone la probabilidad de que se genere la concurrencia de vicios como suplantación de identidad de los contratantes, y/o la ausencia de voluntad de los mismos e inclusive el desconocimiento de los efectos jurídicos de los contratos, así como que se produzcan falsificaciones documentarias, por ausencia de control de legalidad. Puede, asimismo, conllevar la afectación del patrimonio o propiedad de terceras personas, así como que se publiciten garantías inexistentes o con vicios y a la ejecución extrajudicial de bienes de terceros con la consecuente pérdida de propiedad de los mismos.

Se pasará a un sistema de avisos electrónicos (SIGM) para la constitución, cancelación y ejecución de las garantías mobiliarias, realizados únicamente por el acreedor o prestamista quien actúa como titular o administrador de una cuenta. La publicidad que regula el artículo 21.4 de la nueva ley, textualmente indica que el aviso electrónico que se publicitará es independiente de la constitución de garantía mobiliaria; es decir, no convalida la validez jurídica de los contratos, ni garantiza su existencia, eficacia o validez jurídica toda vez que el aviso electrónico no confiere veracidad de la información publicada.

Esta nueva modalidad deja una puerta abierta para la comisión de delitos no solo contra la fe pública, sino también contra el patrimonio e inclusive de lavado de activos, con claro perjuicio a los contratantes y la ciudadanía en su conjunto, lo que implicará una sobrecarga de procesos judiciales.

Sobre el particular, se deja constancia que el pleno del Congreso de la República, con fecha 12 de diciembre de 2024, aprobó en primera votación la derogatoria del referido decreto legislativo, consciente del grave riesgo que dicha normativa implica.

En consecuencia, corresponde que el Congreso de la República ratifique, en segunda votación, la derogatoria de la citada norma, en aras de garantizar la seguridad jurídica y la paz social.

Lima, 27 de febrero de 2025.
Junta de Decanos de los Colegios de Notarios del Perú`,
  },
  {
    id: 2,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-2.jpeg',
    title: 'Actualización en Procedimientos Notariales 2025',
    content: 'El Colegio de Notarios de Puno informa sobre las actualizaciones en los procedimientos notariales que entrarán en vigor a partir del próximo mes, mejorando la eficiencia y seguridad de los trámites.',
    date: '15 de Enero, 2025',
    fullContent: `El Colegio de Notarios de Puno informa sobre las actualizaciones en los procedimientos notariales que entrarán en vigor a partir del próximo mes, mejorando la eficiencia y seguridad de los trámites.

Estas actualizaciones incluyen mejoras en los procesos de verificación de documentos, nuevos protocolos de atención al público, y la implementación de sistemas digitales que agilizarán los trámites sin comprometer la seguridad jurídica. Los notarios recibirán capacitación especializada para implementar estos nuevos procedimientos de manera efectiva.

El objetivo principal de estas actualizaciones es modernizar el servicio notarial, hacerlo más accesible para los ciudadanos, y mantener los más altos estándares de calidad y seguridad jurídica que caracterizan al Colegio de Notarios de Puno.`,
  },
  {
    id: 3,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-3.jpeg',
    title: 'Convocatoria a Asamblea Extraordinaria',
    content: 'Se convoca a todos los miembros del Colegio de Notarios de Puno a participar en la Asamblea Extraordinaria que se llevará a cabo para tratar temas urgentes de interés institucional.',
    date: '5 de Enero, 2025',
    fullContent: `Se convoca a todos los miembros del Colegio de Notarios de Puno a participar en la Asamblea Extraordinaria que se llevará a cabo para tratar temas urgentes de interés institucional.

En esta asamblea se abordarán temas de gran importancia para el futuro del colegio, incluyendo propuestas de reforma estatutaria, actualización de tarifas, y estrategias para mejorar los servicios notariales en la región. La participación de todos los miembros es fundamental para tomar decisiones que beneficien a la institución y a la comunidad.

Se solicita a todos los notarios confirmar su asistencia con anticipación para poder organizar adecuadamente el evento y garantizar que se cumplan los quórums necesarios para la toma de decisiones.`,
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
          {comunicados.slice(0, 3).map((comunicado, index) => (
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
                  to={`/comunicados/${comunicado.id}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 group self-start"
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
            to="/comunicados"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 group"
          >
            Ver todos los comunicados
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ComunicadosSection

