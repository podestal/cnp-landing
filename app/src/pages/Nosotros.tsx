import { motion } from 'framer-motion'
import { Building2, Scale, Users, Award, Target, Eye, Fingerprint } from 'lucide-react'

const Nosotros = () => {
  const features = [
    {
      icon: Building2,
      title: 'Institución Autónoma',
      description: 'Personalidad jurídica de derecho público con autonomía institucional',
    },
    {
      icon: Scale,
      title: 'Marco Legal',
      description: 'Creada mediante Ley N° 16607, promulgada el 23 de junio de 1967',
    },
    {
      icon: Users,
      title: 'Representación Gremial',
      description: 'Ejerce la representación gremial de sus colegiados según su Estatuto',
    },
    {
      icon: Award,
      title: 'Colegiación Obligatoria',
      description: 'Obligatoria para ejercer la función notarial en el Distrito Notarial de Puno',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 md:py-28"
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
              NOSOTROS
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Conoce más sobre nuestra institución y nuestro compromiso con la excelencia notarial
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                  El <span className="font-semibold text-green-700">Colegio de Notarios de Puno</span>, como colegio profesional, es una institución autónoma con personalidad jurídica de derecho público, creada mediante <span className="font-semibold">Ley N° 16607</span>, promulgada el <span className="font-semibold">23 de junio de 1967</span>.
                </p>
                
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                  El Colegio de Notarios de Puno ejerce la representación gremial de sus colegiados en la forma y modo que establece su Estatuto, la Constitución, la Ley y el Derecho vigente.
                </p>
                
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                  La <span className="font-semibold text-green-700">Colegiación es obligatoria</span> para ejercer la función notarial en el Distrito Notarial de Puno, entendiéndose como tal, la habilitación para desarrollar las actividades relacionadas con la función notarial en todos sus campos de aplicación.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

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
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm mt-1">
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

      {/* Biometric Verification Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-50 py-16 md:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Fingerprint className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  VERIFICACIÓN BIOMÉTRICA
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-base md:text-lg leading-relaxed">
                  El <span className="font-semibold text-blue-600">Servicio de Verificación Biométrica (SVB)</span> es un servicio que brinda la RENIEC sobre la base del Sistema Automático de Identificación de Impresiones Dactilares y ha permitido la reducción de los actos delictivos al momento de realizar transacciones.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed">
                  Este servicio es un mecanismo para mejorar la seguridad de la información así como proveer a la población de una herramienta accesible que garantice la integridad de las personas que realizan transacciones económicas, principalmente las que necesitan la intervención de los Notarios Públicos (Compra venta de bienes muebles e inmuebles, cartas poder, permisos de viajes de menores).
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Nosotros