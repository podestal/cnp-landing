import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ParallaxSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax effect - moves up as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1])

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative z-10 bg-white rounded-t-3xl shadow-2xl min-h-screen flex items-center"
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
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Esta es una sección de prueba con efecto parallax que aparece sobre el banner.
            El contenido se desplaza suavemente mientras haces scroll.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="bg-green-50 p-6 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{item}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Elemento {item}
                </h3>
                <p className="text-gray-600">
                  Contenido de ejemplo para demostrar el efecto parallax y las animaciones.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ParallaxSection

