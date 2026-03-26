import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowLeft, Download } from 'lucide-react'
import { useState } from 'react'

type ComunicadoData = {
  id: number
  title: string
  image: string
  date: string
  fullContent: string
  button?: boolean
  buttonLabel?: string
  buttonUrl?: string
}

type ComunicadoProps = {
  comunicado: ComunicadoData
  showButton?: boolean
  buttonLabel?: string
  buttonHref?: string
  buttonDownload?: boolean
  onButtonClick?: () => void
}

const Comunicado = ({
  comunicado,
  showButton = false,
  buttonLabel = 'Ver documento',
  buttonHref,
  buttonDownload = false,
  onButtonClick,
}: ComunicadoProps) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const shouldRenderButton = showButton && (buttonHref || onButtonClick)

  const handleDownload = async () => {
    if (!buttonHref) return
    setIsDownloading(true)
    try {
      const response = await fetch(buttonHref)
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = buttonHref.split('/').pop() || 'comunicado.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objectUrl)
    } catch {
      window.open(buttonHref, '_blank')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-linear-to-br from-green-600 via-green-700 to-green-800 text-white pt-28 pb-20 md:pt-36 md:pb-28"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/comunicados"
              className="inline-flex items-center gap-2 text-green-300 hover:text-white mb-6 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a Comunicados</span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {comunicado.title}
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
          </motion.div>
        </div>
      </motion.section>

      {/* Comunicado Detail */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Image Header */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <motion.img
                src={comunicado.image}
                alt={comunicado.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Date */}
              <div className="flex items-center gap-2 text-green-600 mb-6">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{comunicado.date}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 leading-tight">
                {comunicado.title}
              </h2>

              {/* Content Text */}
              <div className="prose prose-lg max-w-none">
                {comunicado.fullContent.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-gray-700 text-base md:text-lg leading-relaxed mb-6"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {shouldRenderButton && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8"
                >
                  <button
                    type="button"
                    disabled={isDownloading}
                    onClick={buttonDownload ? handleDownload : onButtonClick}
                    className="inline-flex items-center gap-2 justify-center rounded-lg bg-green-600 px-5 py-2.5 text-white font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloading ? 'Descargando...' : buttonLabel}
                  </button>
                </motion.div>
              )}

              {/* Signature */}
              {comunicado.id === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-12 pt-8 border-t border-gray-200 text-right"
                >
                  <p className="text-gray-600 font-semibold text-lg">
                    Junta de Decanos de los Colegios de Notarios del Perú
                  </p>
                </motion.div>
              )}
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  )
}

export default Comunicado
