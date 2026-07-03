import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  HelpCircle,
  CheckCircle,
  DollarSign,
  Monitor,
  Award,
  ClipboardList,
  Download,
} from 'lucide-react'

type Benefit = {
  title: string
  description: string
}

type Speaker = {
  name: string
  credentials: string[]
}

type CostTier = {
  label: string
  amount: string
}

type Cost = {
  amount?: string
  tiers?: CostTier[]
  notes: string[]
}

export type ExtendedEvento = {
  id: number
  image: string
  title: string
  subtitle?: string
  tagline?: string
  date: string
  time: string
  location: string
  description: string
  fullDescription: string
  speaker?: Speaker
  questions?: string[]
  benefits?: Benefit[]
  cost?: Cost
  modality?: string
  certification?: string
  registrationNote?: string
  closingMessage?: string
  downloadUrl?: string
  downloadLabel?: string
}

type EventoExtendedDetailProps = {
  evento: ExtendedEvento
}

const EventoExtendedDetail = ({ evento }: EventoExtendedDetailProps) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!evento.downloadUrl) return
    setIsDownloading(true)
    try {
      const response = await fetch(evento.downloadUrl)
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = evento.downloadUrl.split('/').pop() || 'afiche-evento.jpeg'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objectUrl)
    } catch {
      window.open(evento.downloadUrl, '_blank')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/eventos"
              className="inline-flex items-center gap-2 text-green-300 hover:text-white mb-6 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a Eventos</span>
            </Link>
            <p className="text-green-200 text-sm font-semibold uppercase tracking-wider mb-3">
              Colegio de Notarios de Puno
            </p>
            {evento.subtitle && (
              <p className="text-lg md:text-xl text-green-100 mb-4">{evento.subtitle}</p>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {evento.title}
            </h1>
            {evento.tagline && (
              <p className="text-lg md:text-xl text-green-50 italic">{evento.tagline}</p>
            )}
          </motion.div>
        </div>
      </motion.section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={evento.image}
                  alt={evento.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute top-6 left-6 bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{evento.date}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Hora</p>
                      <p className="font-semibold text-gray-800">{evento.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Modalidad</p>
                      <p className="font-semibold text-gray-800">{evento.location}</p>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                    {evento.description}
                  </p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {evento.fullDescription}
                  </p>
                </div>
              </div>
            </motion.article>

            {evento.speaker && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <User className="w-7 h-7 text-green-600" />
                  Ponente
                </h2>
                <p className="text-xl font-semibold text-green-700 mb-4">{evento.speaker.name}</p>
                <ul className="space-y-3">
                  {evento.speaker.credentials.map((credential, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0" />
                      <span className="leading-relaxed">{credential}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {evento.questions && evento.questions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <HelpCircle className="w-7 h-7 text-green-600" />
                  Preguntas clave
                </h2>
                <p className="text-gray-600 mb-6">Responderemos preguntas como:</p>
                <ul className="space-y-4">
                  {evento.questions.map((question, index) => (
                    <li
                      key={index}
                      className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500 text-gray-700 leading-relaxed"
                    >
                      {question}
                    </li>
                  ))}
                  <li className="text-green-700 font-medium italic">Y muchas más...</li>
                </ul>
              </motion.div>
            )}

            {evento.benefits && evento.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Por qué asistir?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {evento.benefits.map((benefit, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                        <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {evento.cost && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                      <DollarSign className="w-7 h-7 text-green-600" />
                      Costo
                    </h2>
                    {evento.cost.tiers ? (
                      <div className="space-y-3 mb-4">
                        {evento.cost.tiers.map((tier, index) => (
                          <div key={index} className="flex items-center justify-between bg-green-50 rounded-lg px-4 py-3">
                            <span className="font-medium text-gray-800">{tier.label}</span>
                            <span className="text-2xl font-bold text-green-700">{tier.amount}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      evento.cost.amount && (
                        <p className="text-3xl font-bold text-green-700 mb-4">{evento.cost.amount}</p>
                      )
                    )}
                    <ul className="space-y-2">
                      {evento.cost.notes.map((note, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-6">
                  {evento.modality && (
                    <div className="flex items-start gap-3">
                      <Monitor className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Modalidad</p>
                        <p className="text-gray-600">{evento.modality}</p>
                      </div>
                    </div>
                  )}
                  {evento.certification && (
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Certificación</p>
                        <p className="text-gray-600">{evento.certification}</p>
                      </div>
                    </div>
                  )}
                  {evento.registrationNote && (
                    <div className="flex items-start gap-3">
                      <ClipboardList className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Inscripciones</p>
                        <p className="text-gray-600">{evento.registrationNote}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {evento.closingMessage && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-green-700 rounded-2xl shadow-xl p-8 md:p-10 text-center text-white"
              >
                <p className="text-lg md:text-xl leading-relaxed font-medium">
                  {evento.closingMessage}
                </p>
              </motion.div>
            )}

            {evento.downloadUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  {isDownloading ? 'Descargando...' : (evento.downloadLabel || 'Descargar afiche')}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventoExtendedDetail
