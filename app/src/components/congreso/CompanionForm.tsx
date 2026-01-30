import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, FileText, Plus, X, CheckCircle2, AlertCircle, Loader2, Upload } from 'lucide-react'
import { useCreateCompanion } from '../../hooks/api/companion/useCreateCompanion'
import { useParticipantRegistrationStore } from '../../store/participantRegistrationStore'

interface CompanionFormData {
  first_name: string
  last_name: string
  dni: string
  receipt: File | null
}

const CompanionForm = () => {
  const navigate = useNavigate()
  const participant = useParticipantRegistrationStore((state: ReturnType<typeof useParticipantRegistrationStore.getState>) => state.participant)
  const createCompanion = useCreateCompanion()
  
  const [companions, setCompanions] = useState<CompanionFormData[]>([])
  const [errors, setErrors] = useState<{ [key: number]: { [key: string]: string } }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedCompanions, setSubmittedCompanions] = useState<number[]>([])

  // Refs for form fields
  const firstNameRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})
  const lastNameRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})
  const dniRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})
  const receiptRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  // Redirect if no participant
  if (!participant?.id) {
    navigate('/congreso2026')
    return null
  }

  const validateCompanion = (companion: CompanionFormData, index: number): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!companion.first_name.trim()) {
      newErrors.first_name = 'Este campo es requerido'
    } else if (companion.first_name.trim().length < 2) {
      newErrors.first_name = 'Debe tener al menos 2 caracteres'
    }

    if (!companion.last_name.trim()) {
      newErrors.last_name = 'Este campo es requerido'
    } else if (companion.last_name.trim().length < 2) {
      newErrors.last_name = 'Debe tener al menos 2 caracteres'
    }

    if (!companion.dni.trim()) {
      newErrors.dni = 'Este campo es requerido'
    } else if (!/^\d{8}$/.test(companion.dni)) {
      newErrors.dni = 'El DNI debe tener 8 dígitos'
    }

    if (!companion.receipt) {
      newErrors.receipt = 'El comprobante de pago es requerido'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, [index]: newErrors }))
      return false
    }

    return true
  }

  const handleAddCompanion = () => {
    setCompanions(prev => [...prev, { first_name: '', last_name: '', dni: '', receipt: null }])
  }

  const handleRemoveCompanion = (index: number) => {
    setCompanions(prev => prev.filter((_, i) => i !== index))
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[index]
      // Reindex errors
      const reindexed: { [key: number]: { [key: string]: string } } = {}
      Object.keys(newErrors).forEach(key => {
        const keyNum = parseInt(key)
        if (keyNum > index) {
          reindexed[keyNum - 1] = newErrors[keyNum]
        } else {
          reindexed[keyNum] = newErrors[keyNum]
        }
      })
      return reindexed
    })
    setSubmittedCompanions(prev => prev.filter(i => i !== index).map(i => i > index ? i - 1 : i))
  }

  const handleCompanionChange = (index: number, field: keyof CompanionFormData, value: string) => {
    setCompanions(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })

    // Clear error for this field
    if (errors[index]?.[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        if (newErrors[index]) {
          delete newErrors[index][field]
          if (Object.keys(newErrors[index]).length === 0) {
            delete newErrors[index]
          }
        }
        return newErrors
      })
    }
  }

  const handleReceiptChange = (index: number, file: File | null) => {
    setCompanions(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], receipt: file }
      return updated
    })

    // Clear error for receipt
    if (errors[index]?.receipt) {
      setErrors(prev => {
        const newErrors = { ...prev }
        if (newErrors[index]) {
          delete newErrors[index].receipt
          if (Object.keys(newErrors[index]).length === 0) {
            delete newErrors[index]
          }
        }
        return newErrors
      })
    }
  }

  const handleSubmitCompanion = async (index: number) => {
    const companion = companions[index]
    
    if (!validateCompanion(companion, index)) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors[index] || {})[0]
      const refs: { [key: string]: HTMLInputElement | null } = {
        first_name: firstNameRefs.current[index],
        last_name: lastNameRefs.current[index],
        dni: dniRefs.current[index],
        receipt: receiptRefs.current[index],
      }
      const ref = refs[firstErrorField]
      if (ref) {
        setTimeout(() => {
          ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
          ref.focus()
        }, 100)
      }
      return
    }

    setIsSubmitting(true)
    
    // Create FormData to include the receipt file
    const formDataToSend = new FormData()
    formDataToSend.append('first_name', companion.first_name.trim())
    formDataToSend.append('last_name', companion.last_name.trim())
    formDataToSend.append('dni', companion.dni.trim())
    formDataToSend.append('participant', participant.id!.toString())
    formDataToSend.append('receipt', companion.receipt!)

    createCompanion.mutate(formDataToSend as any, {
      onSuccess: () => {
        setSubmittedCompanions(prev => [...prev, index])
        setIsSubmitting(false)
      },
      onError: (error: any) => {
        console.error('Error creating companion:', error)
        setIsSubmitting(false)
      }
    })
  }

  const handleContinue = () => {
    // Navigate to confirmation page
    navigate('/congreso2026/confirmacion')
  }

  const handleSkip = () => {
    // Navigate to confirmation page without adding companions
    navigate('/congreso2026/confirmacion')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 sm:mb-6">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Acompañantes
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Agrega los acompañantes que asistirán contigo al congreso (opcional)
          </p>
        </motion.div>

        {/* Companions List */}
        <div className="space-y-6">
          <AnimatePresence>
            {companions.map((companion, index) => {
              const isSubmitted = submittedCompanions.includes(index)
              const companionErrors = errors[index] || {}

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Acompañante {index + 1}
                    </h3>
                    {!isSubmitted && (
                      <button
                        onClick={() => handleRemoveCompanion(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {isSubmitted ? (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <p className="text-green-800 font-medium">
                        {companion.first_name} {companion.last_name} agregado exitosamente
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Name and Last Name Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <User className="w-4 h-4 inline mr-2 text-green-600" />
                            Nombres *
                          </label>
                          <input
                            ref={(el) => { firstNameRefs.current[index] = el }}
                            type="text"
                            value={companion.first_name}
                            onChange={(e) => handleCompanionChange(index, 'first_name', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                              companionErrors.first_name
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                            }`}
                            placeholder="Ingresa los nombres"
                          />
                          {companionErrors.first_name && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {companionErrors.first_name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <User className="w-4 h-4 inline mr-2 text-green-600" />
                            Apellidos *
                          </label>
                          <input
                            ref={(el) => { lastNameRefs.current[index] = el }}
                            type="text"
                            value={companion.last_name}
                            onChange={(e) => handleCompanionChange(index, 'last_name', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                              companionErrors.last_name
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                            }`}
                            placeholder="Ingresa los apellidos"
                          />
                          {companionErrors.last_name && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {companionErrors.last_name}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* DNI */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FileText className="w-4 h-4 inline mr-2 text-green-600" />
                          DNI *
                        </label>
                        <input
                          ref={(el) => { dniRefs.current[index] = el }}
                          type="text"
                          value={companion.dni}
                          onChange={(e) => handleCompanionChange(index, 'dni', e.target.value.replace(/\D/g, ''))}
                          maxLength={8}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            companionErrors.dni
                              ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                          }`}
                          placeholder="12345678"
                        />
                        {companionErrors.dni && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {companionErrors.dni}
                          </p>
                        )}
                      </div>

                      {/* Receipt Upload */}
                      <div className="mb-6">
                        <label htmlFor={`receipt-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                          <Upload className="w-4 h-4 inline mr-2 text-green-600" />
                          Comprobante de Pago *
                        </label>
                        <div className="mt-2">
                          <label
                            htmlFor={`receipt-${index}`}
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                              companionErrors.receipt
                                ? 'border-red-300 bg-red-50 hover:border-red-400'
                                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className={`w-8 h-8 mb-2 ${companionErrors.receipt ? 'text-red-400' : 'text-gray-400'}`} />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click para subir</span> o arrastra el archivo
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, PDF (MAX. 5MB)</p>
                            </div>
                            <input
                              ref={(el) => { receiptRefs.current[index] = el }}
                              type="file"
                              id={`receipt-${index}`}
                              name={`receipt-${index}`}
                              onChange={(e) => handleReceiptChange(index, e.target.files?.[0] || null)}
                              accept="image/*,.pdf"
                              className="hidden"
                            />
                          </label>
                          {companionErrors.receipt && (
                            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {companionErrors.receipt}
                            </p>
                          )}
                          {companion.receipt && !companionErrors.receipt && (
                            <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Archivo seleccionado: {companion.receipt.name}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={() => handleSubmitCompanion(index)}
                        disabled={isSubmitting || createCompanion.isPending}
                        className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting || createCompanion.isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Guardando...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Guardar Acompañante
                          </>
                        )}
                      </button>
                    </>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Add Companion Button */}
          <motion.button
            onClick={handleAddCompanion}
            className="w-full p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-colors flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-6 h-6 text-green-600" />
            <span className="font-semibold text-gray-700">Agregar Acompañante</span>
          </motion.button>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              onClick={handleSkip}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Omitir
            </button>
            <button
              onClick={handleContinue}
              disabled={companions.length > 0 && companions.length !== submittedCompanions.length}
              className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanionForm
