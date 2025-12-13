import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react'

const navLinks = [
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/eventos', label: 'Eventos' },
  { path: '/comunicados', label: 'Comunicados' },
  { path: '/noticias', label: 'Noticias' },
  { path: '/video', label: 'Video' },
  { path: '/legislacion', label: 'Legislación' },
  { path: '/contacto', label: 'Contacto' },
]

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-green-400 mb-4">Contáctenos</h3>
            <div className="space-y-3 w-full">
              <motion.a
                href="mailto:notariospuno@hotmail.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-green-400" />
                <span>notariospuno@hotmail.com</span>
              </motion.a>
              <motion.a
                href="tel:+051364155"
                className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-green-400" />
                <span>+051 364155</span>
              </motion.a>
              <motion.div
                className="flex items-start space-x-3 text-gray-300"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                <span>Jr. Vilque N° 157<br />Puno - Puno</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Hours Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center justify-center md:justify-start space-x-2">
              <span>Horario de Atención</span>
            </h3>
            <div className="space-y-4 w-full">
              <div>
                <h4 className="font-semibold text-white mb-2">Lunes a Viernes</h4>
                <p className="text-gray-300">Mañana: 09:00 am - 02:00 pm</p>
                <p className="text-gray-300">Tarde: 04:00 pm - 07:00 pm</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Sábado</h4>
                <p className="text-gray-300">Mañana: 09:00 am - 12:00 pm</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-green-400 mb-4">Enlaces</h3>
            <nav className="space-y-2 w-full">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-200 py-1"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-green-400 mb-4">Síguenos</h3>
            <div className="mb-4 flex justify-center md:justify-start w-full">
              <Link to="/" className="flex items-center">
                <img
                  src="https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/cnp-logo-letters-white-nobg.png"
                  alt="Colegio de Notarios de Puno"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400"
        >
          <p className="text-sm">
            © {new Date().getFullYear()} Colegio de Notarios de Puno. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
