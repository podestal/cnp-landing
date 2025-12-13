import { motion } from 'framer-motion'

const logos = [
  {
    name: 'CNL',
    url: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/cnl-logo-nobg.png',
    size: 'xl', // default, sm, md, lg, xl
  },
  {
    name: 'SUNARP',
    url: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/sunarp-logo-nobg.png',
    size: 'xl',
  },
  {
    name: 'RENIEC',
    url: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/reniec-logo-nobg.png',
    size: 'xl',
  },
  {
    name: 'Migraciones',
    url: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/migraciones-logo-nobg.png',
    size: 'default',
  },
  {
    name: 'El Peruano',
    url: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/elperuano-logo-nobg.png',
    size: 'md',
  },
  {
    name: 'SUNAT',
    url: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/sunat-logo-nobg.png',
    size: 'md',
  },
]

const getSizeClass = (size: string) => {
  const sizeMap: Record<string, string> = {
    sm: 'max-h-12',
    md: 'max-h-16',
    default: 'max-h-20',
    lg: 'max-h-24',
    xl: 'max-h-32',
  }
  return sizeMap[size] || sizeMap.default
}

const LogosSection = () => {
  return (
    <section className="relative z-20 bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Instituciones Relacionadas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Organismos e instituciones con las que trabajamos en conjunto
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 150,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.15,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="flex items-center justify-center"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className={`max-w-full ${getSizeClass(logo.size)} w-auto h-auto object-contain transition-all duration-300`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogosSection

