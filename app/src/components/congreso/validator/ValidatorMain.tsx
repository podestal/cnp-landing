import axios from 'axios'
import { motion } from 'framer-motion'
import { useState } from 'react'

type ParticipantValidationResponse = {
  id: number
  first_name: string
  last_name: string
  code: string
}

const ValidatorMain = () => {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [participantName, setParticipantName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleValidate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedCode = code.trim().toUpperCase()

    if (!trimmedCode) {
      setError('Ingrese un código válido.')
      setMessage(null)
      return
    }

    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { data } = await axios.get<ParticipantValidationResponse>(
        `https://app.l-r-p-2991.workers.dev/participants/${trimmedCode}`
      )

      const fullName = `${data.first_name} ${data.last_name}`.trim()
      setParticipantName(fullName)
      setMessage('Participó en el XVIII Congreso Nacional de Notarios')
    } catch (err) {
      setError('No se encontró el participante con ese código.')
      setParticipantName(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
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
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">VALIDADOR</h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-green-50">
              Verifica la participación usando el código del participante
            </p>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <form onSubmit={handleValidate} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Código del participante
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="Ej: CNP001001"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-green-600 px-4 py-3 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Validando...' : 'Validar código'}
              </button>
            </form>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-green-900"
              >
                <p className="text-sm uppercase tracking-wide text-green-700">
                  Certificado emitido por Colegio de Notarios de Puno
                </p>
                <p className="mt-2 text-xl font-semibold">
                  {participantName}
                </p>
                <p className="mt-1 text-sm text-green-800">
                  {message}
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ValidatorMain