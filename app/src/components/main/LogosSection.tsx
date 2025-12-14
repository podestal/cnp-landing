import { motion } from 'framer-motion'

const logos = [
  {
    name: 'CNL',
    imageUrl: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/cnl-logo-nobg.png',
    linkUrl: 'https://www.notarios.org.pe/#/home',
    size: 'xl', // default, sm, md, lg, xl
  },
  {
    name: 'SUNARP',
    imageUrl: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/sunarp-logo-nobg.png',
    linkUrl: 'https://www.sunarp.gob.pe/serviciosenlinea/portal/index.html',
    size: 'xl',
  },
  {
    name: 'RENIEC',
    imageUrl: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/reniec-logo-nobg.png',
    linkUrl: 'https://identidad.reniec.gob.pe/ciudadano',
    size: 'xl',
  },
  {
    name: 'Migraciones',
    imageUrl: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/migraciones-logo-nobg.png',
    linkUrl: 'https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad',
    size: 'default',
  },
  {
    name: 'El Peruano',
    imageUrl: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/elperuano-logo-nobg.png',
    linkUrl: 'https://elperuano.pe/',
    size: 'md',
  },
  {
    name: 'SUNAT',
    imageUrl: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/logos-other/sunat-logo-nobg.png',
    linkUrl: 'https://www.sunat.gob.pe/',
    size: 'md',
  },
]

const getSizeClass = (size: string) => {
  const sizeMap: Record<string, string> = {
    sm: 'max-h-8 sm:max-h-12',
    md: 'max-h-10 sm:max-h-16',
    default: 'max-h-12 sm:max-h-20',
    lg: 'max-h-16 sm:max-h-24',
    xl: 'max-h-20 sm:max-h-32',
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Instituciones Relacionadas
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Organismos e instituciones con las que trabajamos en conjunto
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center">
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
              <a
                href={logo.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
                aria-label={`Visitar ${logo.name}`}
              >
                <img
                  src={logo.imageUrl}
                  alt={logo.name}
                  className={`max-w-full ${getSizeClass(logo.size)} w-auto h-auto object-contain transition-all duration-300`}
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogosSection

