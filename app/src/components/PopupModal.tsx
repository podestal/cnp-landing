import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileText, Download, X } from 'lucide-react'
import { comunicados } from './main/ComunicadosSection'

const comunicado = comunicados.find(c => c.id === 1)!

const popupContent = {
  title: 'CONCURSO PÚBLICO DE MÉRITOS PARA EL INGRESO AL NOTARIADO Nº 001-2026-CNP/PUNO-PERÚ — AMPLIACIÓN DE PLAZO DE INSCRIPCIÓN',
  date: '17 de Junio, 2026',
  content:
    'El Colegio de Notarios de Puno informa que, por acuerdo de Junta Directiva, se amplía el plazo de inscripción al concurso. Las inscripciones se recibirán del 08 de mayo al 31 de julio de 2026 en el local institucional (Jr. Vilque N° 157 – Barrio Orkapata, Puno), de lunes a viernes de 09:00 a.m. a 02:00 p.m. y de 04:00 p.m. a 07:00 p.m. Derecho de inscripción: S/ 2,670.00 mediante depósito en Caja Arequipa a nombre del Colegio de Notarios de Puno.',
  buttonUrl:
    'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/comunicados/cnp_comunicados_BO20260323_004.pdf',
}

const PopupModal = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // Preload image
  useEffect(() => {
    const img = new Image()
    img.src = comunicado.image
    img.onload = () => setImageLoaded(true)
    imageRef.current = img
  }, [])

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [imageLoaded])

  const handleClose = () => setIsOpen(false)

  const handleReadMore = () => {
    setIsOpen(false)
    navigate(`/comunicados/${comunicado.id}`)
  }

  const handleDownload = async () => {
    if (!popupContent.buttonUrl) return
    setIsDownloading(true)
    try {
      const response = await fetch(popupContent.buttonUrl)
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = popupContent.buttonUrl.split('/').pop() || 'comunicado.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objectUrl)
    } catch {
      window.open(popupContent.buttonUrl, '_blank')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            style={{ willChange: 'opacity' }}
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Header with image background */}
              <div
                className="text-white p-6 sm:p-8 pb-6 relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[180px] flex items-end"
                style={{
                  backgroundImage: imageLoaded ? `url(${comunicado.image})` : 'none',
                  backgroundColor: imageLoaded ? 'transparent' : '#1f2937',
                }}
              >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Comunicado</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                    {popupContent.title}
                  </h2>
                  <p className="text-white/70 text-xs mt-1">{popupContent.date}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8 overflow-y-auto">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
                  {popupContent.content}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  {popupContent.buttonUrl && (
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="cursor-pointer w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Download className="w-5 h-5" />
                      {isDownloading ? 'Descargando...' : (comunicado.buttonLabel || 'Descargar comunicado')}
                    </button>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleReadMore}
                      className="cursor-pointer flex-1 px-6 py-3 bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-colors duration-200 border border-green-200"
                    >
                      Leer más
                    </button>
                    <button
                      onClick={handleClose}
                      className="cursor-pointer flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PopupModal
