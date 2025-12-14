import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Users, Mail, Wrench } from 'lucide-react'

const services = [
  {
    title: 'Servicios',
    description: 'Legalización de firmas en documentos que van a ser remitidos al exterior',
    icon: FileText,
    path: '/servicios',
    color: 'green',
  },
  {
    title: 'Notarios',
    description: 'Relación de notarios pertenecientes al colegio de notarios de Puno',
    icon: Users,
    path: '/notarios',
    color: 'green',
  },
  {
    title: 'Contáctenos',
    description: '¿Tiene alguna duda? No dude en contactar con nosotros, le responderemos a la brevedad',
    icon: Mail,
    path: '/contacto',
    color: 'green',
  },
  {
    title: 'Herramientas Tecnológicas',
    description: 'Conforme al artículo 123-A del decreto legislativo N° 1049',
    icon: Wrench,
    path: '/herramientas',
    color: 'green',
  },
]

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax effect - moves up as you scroll (disabled on mobile to prevent overlap issues)
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['-20%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1])

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative z-10 bg-white rounded-t-3xl md:rounded-t-3xl shadow-2xl min-h-screen flex items-center mt-0 md:mt-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Bienvenido al Colegio de Notarios de Puno
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Somos una institución comprometida con la excelencia en el servicio notarial,
            brindando asesoría legal y servicios de calidad a la comunidad de Puno.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="w-14 h-14 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center mb-6 grow">
                  {service.description}
                </p>
                <Link
                  to={service.path}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 group"
                >
                  Ver más
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

export default ServicesSection

