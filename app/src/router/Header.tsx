import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/institucional', label: 'Institucional' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/eventos', label: 'Eventos' },
  { path: '/comunicados', label: 'Comunicados' },
  { path: '/noticias', label: 'Noticias' },
  { path: '/video', label: 'Video' },
  { path: '/legislacion', label: 'Legislación' },
  { path: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent shadow-none'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-20 sm:min-h-24 md:min-h-28 lg:min-h-32 py-2">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-2 sm:space-x-3 transition-all duration-300"
            >
              <div
                className={`transition-all duration-300 ${
                  !isScrolled 
                    ? 'bg-white/50 backdrop-blur-md px-3 py-2 rounded-lg shadow-lg' 
                    : ''
                }`}
              >
                <img
                  src="https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/cnp-logo-nobg.png"
                  alt="Colegio de Notarios de Puno"
                  className={`h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain transition-all duration-300 ${
                    !isScrolled ? 'drop-shadow-2xl' : ''
                  }`}
                />
              </div>
              {!isScrolled ? (
                <img
                  src="https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/cnp-logo-letters-white-nobg.png"
                  alt="Colegio de Notarios de Puno"
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain sm:block transition-all duration-300"
                />
              ) : (
                <img
                  src="https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/cnp-writting-nobg.png"
                  alt="Colegio de Notarios de Puno"
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain sm:block transition-all duration-300"
                />
              )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-green-600'
                      : 'text-white hover:text-green-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/20'
            }`}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              className="w-6 h-6 flex flex-col justify-center space-y-1.5"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
                className={`w-full h-0.5 rounded transition-colors duration-200 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className={`w-full h-0.5 rounded transition-colors duration-200 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
                className={`w-full h-0.5 rounded transition-colors duration-200 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path
              return (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: isMobileMenuOpen ? 0 : -20,
                    opacity: isMobileMenuOpen ? 1 : 0,
                  }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-green-50 text-green-600 border-l-4 border-green-600'
                        : isScrolled
                        ? 'text-gray-700 hover:bg-gray-50'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

