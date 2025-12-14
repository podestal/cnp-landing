import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

const Comunicados = () => {
  const comunicado = {
    id: 1,
    image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-1.jpeg',
    title: 'LA JUNTA DE DECANOS DE LOS COLEGIOS DE NOTARIOS DEL PERU INFORMA A LA COLECTIVIDAD',
    date: '27 de Febrero, 2025',
    content: `El notariado peruano encargado, por ley, para dar fe y velar por la seguridad jurídica de los contratos de los ciudadanos, hace de conocimiento de la opinión publica el grave riesgo que se generará con la entrada en vigor del nuevo Régimen de Garantías Mobiliarias – Decreto Legislativo 1400, prevista para el 3 de marzo de 2025, en razón de lo dispuesto por la Resolución N° 0011-2025-SUNARP/SN.

Esta nueva ley constituye un cambio radical en el país respecto de la formalidad para constituir las garantías mobiliarias, así como de la publicidad de las mismas y de su ejecución. Esta modalidad pone en serio riesgo la seguridad jurídica de dichas garantías al abrirse la posibilidad de constitución de las mismas sin la intervención notarial que garantice la identidad, la capacidad, la voluntad y el conocimiento de los intervinientes; al prescindirse del instrumento notarial protocolar y del filtro de legalidad que supone la calificación registral como requisito para la inscripción de la publicidad de las referidas garantías mobiliarias, lo que puede ocasionar ejecuciones extrajudiciales impugnables en la vía judicial.

La eliminación de los filtros antes indicados supone la probabilidad de que se genere la concurrencia de vicios como suplantación de identidad de los contratantes, y/o la ausencia de voluntad de los mismos e inclusive el desconocimiento de los efectos jurídicos de los contratos, así como que se produzcan falsificaciones documentarias, por ausencia de control de legalidad. Puede, asimismo, conllevar la afectación del patrimonio o propiedad de terceras personas, así como que se publiciten garantías inexistentes o con vicios y a la ejecución extrajudicial de bienes de terceros con la consecuente pérdida de propiedad de los mismos.

Se pasará a un sistema de avisos electrónicos (SIGM) para la constitución, cancelación y ejecución de las garantías mobiliarias, realizados únicamente por el acreedor o prestamista quien actúa como titular o administrador de una cuenta. La publicidad que regula el artículo 21.4 de la nueva ley, textualmente indica que el aviso electrónico que se publicitará es independiente de la constitución de garantía mobiliaria; es decir, no convalida la validez jurídica de los contratos, ni garantiza su existencia, eficacia o validez jurídica toda vez que el aviso electrónico no confiere veracidad de la información publicada.

Esta nueva modalidad deja una puerta abierta para la comisión de delitos no solo contra la fe pública, sino también contra el patrimonio e inclusive de lavado de activos, con claro perjuicio a los contratantes y la ciudadanía en su conjunto, lo que implicará una sobrecarga de procesos judiciales.

Sobre el particular, se deja constancia que el pleno del Congreso de la República, con fecha 12 de diciembre de 2024, aprobó en primera votación la derogatoria del referido decreto legislativo, consciente del grave riesgo que dicha normativa implica.

En consecuencia, corresponde que el Congreso de la República ratifique, en segunda votación, la derogatoria de la citada norma, en aras de garantizar la seguridad jurídica y la paz social.

Lima, 27 de febrero de 2025.
Junta de Decanos de los Colegios de Notarios del Perú`,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-28 pb-20 md:pt-36 md:pb-28"
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
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Mantente informado sobre las últimas noticias y comunicados del Colegio de Notarios de Puno
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
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
            <div className="relative h-64 md:h-80 overflow-hidden">
              <motion.img
                src={comunicado.image}
                alt={comunicado.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Date */}
              <div className="flex items-center gap-2 text-green-600 mb-6">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{comunicado.date}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 leading-tight">
                {comunicado.title}
              </h2>

              {/* Content Text */}
              <div className="prose prose-lg max-w-none">
                {comunicado.content.split('\n\n').map((paragraph, index) => (
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

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 pt-8 border-t border-gray-200 text-right"
              >
                <p className="text-gray-600 font-semibold text-lg">
                  Junta de Decanos de los Colegios de Notarios del Perú
                </p>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  )
}

export default Comunicados

