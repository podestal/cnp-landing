import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

const InstitucionalMisionVision = () => {
  return (
    <>
      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-green-50 py-16 md:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  MISIÓN
                </h2>
              </div>
              
              <p className="text-gray-600 mb-8 text-center text-sm md:text-base">
                De acuerdo a nuestro Estatuto en el <span className="font-semibold">TITULO I, CAPITULO III ARTICULO 5°</span>, son fines del Colegio de Notarios de Puno:
              </p>

              <div className="space-y-4">
                {[
                  'Ejercer la representación gremial de sus miembros.',
                  'Defender los derechos del notariado peruano, cuidando que sus miembros gocen de las garantías y consideraciones que les otorga la ley.',
                  'Velar por el respeto y dignidad de la función notarial, cumplimiento del Código de Ética del Notariado, el presente Estatuto y normas vigentes.',
                  'Propender al perfeccionamiento de la legislación notarial, formulando iniciativas legislativas que recojan los principios rectores del Sistema del Notariado Latino al que pertenecemos.',
                  'Asegurar el respeto de los derechos humanos de los notarios, de los usuarios y todos cuantos hagan uso del servicio notarial.',
                  'Promover el espíritu de solidaridad, fraternidad, ayuda mutua y unidad entre sus miembros.',
                  'Pronunciarse institucionalmente sobre los acontecimientos que requieran juicio crítico y constructivo de nivel profesional.',
                  'Lograr el perfeccionamiento profesional de sus miembros, mediante el desarrollo de eventos académicos en derecho, especialmente en materia notarial y registral.',
                  'Fomentar la divulgación de la doctrina, legislación notarial y de los principios rectores del notariado latino a nivel nacional e internacional, que permitan el mejor desenvolvimiento y desarrollo de la función notarial.',
                  'Proyectarse a la sociedad, difundiendo los objetivos, fines y principios rectores del Notariado Latino; y,',
                  'Auspiciar el estudio y conocimiento de la doctrina, principios y naturaleza jurídica que informa la Unión internacional del Notariado (UINL) y el Sistema del Notariado Latino (SNL), tanto a nivel nacional e internacional, otorgando premios y estímulos a los ganadores de los concursos que se lleven a cabo.',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-green-50 transition-colors duration-200"
                  >
                    <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed pt-1">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 md:py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 md:p-12 text-white"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  VISIÓN
                </h2>
              </div>
              
              <p className="text-lg md:text-xl leading-relaxed text-center text-green-50">
                Ejercer la representación gremial de sus colegiados en la forma y modo que establece el Estatuto del Colegio de Notarios de Puno, la Ley y el Derecho vigente.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default InstitucionalMisionVision

