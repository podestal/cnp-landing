import { motion } from 'framer-motion'
import { Building2, Scale, Users, Award } from 'lucide-react'

const InstitucionalNosotros = () => {
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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Nosotros
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto" />
        </motion.div>

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
  )
}

export default InstitucionalNosotros

