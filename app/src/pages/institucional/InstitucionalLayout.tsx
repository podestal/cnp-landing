import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Users, Award, Target } from 'lucide-react'

const institucionalLinks = [
  { path: '/institucional', label: 'Nosotros', icon: Building2 },
  { path: '/institucional/junta-directiva', label: 'Junta Directiva', icon: Users },
  { path: '/institucional/tribunal-de-honor', label: 'Tribunal de Honor', icon: Award },
  { path: '/institucional/mision-vision', label: 'Misión y Visión', icon: Target },
]

const InstitucionalLayout = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white pt-28 pb-20 md:pt-36 md:pb-28"
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
              Institucional
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Conoce la estructura institucional del Colegio de Notarios de Puno
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Navigation Tabs */}
      <section className="hidden md:block bg-white border-b border-gray-200 sticky top-20 md:top-24 lg:top-28 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 min-w-full">
              {institucionalLinks.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.path || 
                  (link.path === '/institucional' && location.pathname === '/institucional')
                return (
                  <motion.div
                    key={link.path}
                    className="relative"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.path}
                      className={`relative flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap border-b-2 ${
                        isActive
                          ? 'border-green-600 text-green-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="institucionalTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <Outlet />
    </div>
  )
}

export default InstitucionalLayout

