import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, CreditCard, Loader2 } from 'lucide-react'
import { useGetParticipantByDNI } from '../../../../hooks/api/participant/useGetParticipantByDNI'
import { useAuthStore } from '../../../../store/authStore'
import type { Participant } from '../../../../services/api/participantService'

// Helper to get cookie
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

interface SearchParticipantByDniProps {
  onParticipantFound: (participant: Participant) => void
  isLoading?: boolean
  setIsLoading?: (loading: boolean) => void
}

const SearchParticipantByDni = ({ onParticipantFound, isLoading = false, setIsLoading }: SearchParticipantByDniProps) => {
  const [dni, setDni] = useState('')
  const [searchDni, setSearchDni] = useState('')
  const [error, setError] = useState<string | null>(null)
  const processedParticipantRef = useRef<string | null>(null) // Track which participant we've already processed
  
  // Reset everything when component mounts (when key changes)
  useEffect(() => {
    setDni('')
    setSearchDni('')
    setError(null)
    processedParticipantRef.current = null
  }, [])
  
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token') || ''
  
  const { data: participant, isLoading: queryLoading, error: queryError } = useGetParticipantByDNI({
    access: accessToken,
    dni: searchDni,
  })

  // Update loading state in parent
  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(queryLoading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryLoading]) // Removed setIsLoading from dependencies to prevent loops

  // Handle successful participant fetch
  useEffect(() => {
    // Only process if we have a participant, matching DNI, and haven't processed it yet
    // IMPORTANT: Only process if we have an active search (searchDni matches dni)
    if (participant && dni && searchDni && searchDni === dni && dni.length === 8) {
      const participantKey = `${participant.id}-${searchDni}`
      if (processedParticipantRef.current !== participantKey) {
        processedParticipantRef.current = participantKey
        onParticipantFound(participant)
        setError(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participant, dni, searchDni]) // Removed onParticipantFound from dependencies to prevent loops
  
  // Reset processed participant when DNI input changes or component unmounts
  useEffect(() => {
    if (!dni) {
      processedParticipantRef.current = null
    }
    
    return () => {
      processedParticipantRef.current = null
    }
  }, [dni])

  // Handle query errors
  useEffect(() => {
    if (queryError && searchDni) {
      setError('Participante no encontrado. Verifica que el DNI sea correcto.')
    }
  }, [queryError, searchDni])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Reset processed participant ref when starting a new search
    processedParticipantRef.current = null

    if (!dni.trim()) {
      setError('Por favor, ingresa un DNI')
      return
    }

    if (dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos')
      return
    }

    // Only trigger the query if the DNI is different from the current search
    // This prevents duplicate requests
    if (searchDni !== dni) {
      setSearchDni(dni)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Buscar Participante</h2>
          <p className="text-sm text-gray-600">Ingresa el DNI del participante</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-2">
            DNI
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => {
                setDni(e.target.value)
                setError(null)
              }}
              placeholder="Ingresa el DNI (ej: 12345678)"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
              disabled={isLoading || queryLoading}
              maxLength={8}
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || queryLoading || !dni.trim() || dni.length !== 8}
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {(isLoading || queryLoading) ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Buscar Participante
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}

export default SearchParticipantByDni
