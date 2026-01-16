import { useState, useRef } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, FileText, MapPin, Building2, Upload, CheckCircle2, AlertCircle, BookOpen, Loader2 } from 'lucide-react'
import { useGetTemas } from '../../hooks/api/tema/useGetTemas'
import { useCreateParticipant } from '../../hooks/api/participant/useCreateParticipant'
import type { Tema } from '../../services/api/temaService'

interface FormData {
  name: string
  last_name: string
  dni: string
  email: string
  celphone: string
  ruc: string
  location: string
  tema: string
  receipt: File | null
}

interface FormErrors {
  [key: string]: string
}

const CongresoForm = () => {
  const navigate = useNavigate()
  const { data: temas, isLoading: isLoadingTemas, error: temasError } = useGetTemas()
  const createParticipant = useCreateParticipant()
  
  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const dniRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const celphoneRef = useRef<HTMLInputElement>(null)
  const rucRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const temaRef = useRef<HTMLDivElement>(null)
  const receiptRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    last_name: '',
    dni: '',
    email: '',
    celphone: '',
    ruc: '',
    location: '',
    tema: '',
    receipt: null
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
      case 'last_name':
        if (!value.trim()) return 'Este campo es requerido'
        if (value.trim().length < 2) return 'Debe tener al menos 2 caracteres'
        return ''
      case 'dni':
        if (!value.trim()) return 'Este campo es requerido'
        if (!/^\d{8}$/.test(value)) return 'El DNI debe tener 8 dígitos'
        return ''
      case 'email':
        if (!value.trim()) return 'Este campo es requerido'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido'
        return ''
      case 'celphone':
        if (!value.trim()) return 'Este campo es requerido'
        if (value.trim().length < 9) return 'Número de teléfono inválido'
        return ''
      case 'ruc':
        if (!value.trim()) return 'Este campo es requerido'
        if (!/^\d{11}$/.test(value)) return 'El RUC debe tener 11 dígitos'
        return ''
      case 'location':
        if (!value.trim()) return 'Este campo es requerido'
        return ''
      case 'tema':
        if (!value.trim()) return 'Este campo es requerido'
        return ''
      default:
        return ''
    }
  }

  const validateReceipt = (): string => {
    if (!formData.receipt) {
      return 'El comprobante de pago es requerido'
    }
    return ''
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleTemaSelect = (temaId: number) => {
    setFormData(prev => ({ ...prev, tema: temaId.toString() }))
    
    // Clear error for tema when user selects one
    if (errors.tema) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.tema
        return newErrors
      })
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, receipt: file }))
    
    if (errors.receipt) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.receipt
        return newErrors
      })
    }
  }

  const scrollToFirstError = (errorKeys: string[]) => {
    if (errorKeys.length === 0) return

    const firstErrorKey = errorKeys[0]
    const fieldRefs: { [key: string]: React.RefObject<HTMLElement | HTMLInputElement | HTMLDivElement> } = {
      name: nameRef as React.RefObject<HTMLElement>,
      last_name: lastNameRef as React.RefObject<HTMLElement>,
      dni: dniRef as React.RefObject<HTMLElement>,
      email: emailRef as React.RefObject<HTMLElement>,
      celphone: celphoneRef as React.RefObject<HTMLElement>,
      ruc: rucRef as React.RefObject<HTMLElement>,
      location: locationRef as React.RefObject<HTMLElement>,
      tema: temaRef as React.RefObject<HTMLElement>,
      receipt: receiptRef as React.RefObject<HTMLElement>,
    }

    const ref = fieldRefs[firstErrorKey]
    if (ref?.current) {
      // Small delay to ensure error messages are rendered
      setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        // Focus the input if it's an input field
        if (ref.current instanceof HTMLInputElement) {
          ref.current.focus()
        }
      }, 100)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    Object.keys(formData).forEach(key => {
      if (key !== 'receipt') {
        const error = validateField(key, formData[key as keyof FormData] as string)
        if (error) {
          newErrors[key] = error
        }
      }
    })

    // Validate receipt
    const receiptError = validateReceipt()
    if (receiptError) {
      newErrors.receipt = receiptError
    }

    setErrors(newErrors)
    
    // Scroll to first error if validation fails
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(Object.keys(newErrors))
    }
    
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name.trim())
    formDataToSend.append('last_name', formData.last_name.trim())
    formDataToSend.append('dni', formData.dni.trim())
    formDataToSend.append('email', formData.email.trim())
    formDataToSend.append('celphone', formData.celphone.trim())
    formDataToSend.append('ruc', formData.ruc.trim())
    formDataToSend.append('location', formData.location.trim())
    formDataToSend.append('tema', formData.tema.trim())
    
    // Receipt is required
    formDataToSend.append('receipt', formData.receipt!)

    createParticipant.mutate(formDataToSend, {
      onSuccess: () => {
        // Navigate to confirmation page
        navigate('/congreso2026/confirmacion')
      },
      onError: (error: any) => {
        console.error('Error submitting form:', error)
      }
    })
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
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Inscripción al Congreso
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Completa el siguiente formulario para inscribirte al XVIII Congreso Nacional de Notarios
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10"
        >
          {/* Error Message */}
          {createParticipant.isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 text-sm sm:text-base">
                  Error al enviar
                </p>
                <p className="text-red-700 text-xs sm:text-sm mt-1">
                  {(createParticipant.error as any)?.response?.data?.message || 
                   (createParticipant.error as any)?.response?.data?.error || 
                   (createParticipant.error as any)?.message ||
                   'Error al enviar el formulario. Por favor, intenta nuevamente.'}
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Name and Last Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2 text-green-600" />
                  Nombres *
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                  placeholder="Ingresa tus nombres"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2 text-green-600" />
                  Apellidos *
                </label>
                <input
                  ref={lastNameRef}
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.last_name
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                  placeholder="Ingresa tus apellidos"
                />
                {errors.last_name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>

            {/* DNI and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* DNI */}
              <div>
                <label htmlFor="dni" className="block text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2 text-green-600" />
                  DNI *
                </label>
                <input
                  ref={dniRef}
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  maxLength={8}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.dni
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                  placeholder="12345678"
                />
                {errors.dni && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.dni}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2 text-green-600" />
                  Email *
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.email
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone and RUC Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Phone */}
              <div>
                <label htmlFor="celphone" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2 text-green-600" />
                  Celular *
                </label>
                <input
                  ref={celphoneRef}
                  type="tel"
                  id="celphone"
                  name="celphone"
                  value={formData.celphone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.celphone
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                  placeholder="987654321"
                />
                {errors.celphone && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.celphone}
                  </p>
                )}
              </div>

              {/* RUC */}
              <div>
                <label htmlFor="ruc" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 inline mr-2 text-green-600" />
                  RUC *
                </label>
                <input
                  ref={rucRef}
                  type="text"
                  id="ruc"
                  name="ruc"
                  value={formData.ruc}
                  onChange={handleChange}
                  maxLength={11}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.ruc
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                  placeholder="12345678901"
                />
                {errors.ruc && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.ruc}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
                Ubicación *
              </label>
              <input
                ref={locationRef}
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.location
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                }`}
                placeholder="Ciudad, Departamento"
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* Tema Selection */}
            <div ref={temaRef}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <BookOpen className="w-4 h-4 inline mr-2 text-green-600" />
                Tema *
              </label>
              {isLoadingTemas ? (
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center gap-2 bg-gray-50">
                  <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                  <span className="text-sm text-gray-500">Cargando temas...</span>
                </div>
              ) : temasError ? (
                <div className="w-full px-4 py-3 border border-red-300 rounded-lg bg-red-50">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Error al cargar los temas. Por favor, recarga la página.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {temas?.map((tema: Tema) => {
                      const isSelected = formData.tema === tema.id.toString()
                      return (
                        <motion.div
                          key={tema.id}
                          onClick={() => handleTemaSelect(tema.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'bg-green-50 border-green-500 shadow-md'
                              : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? 'bg-green-600 border-green-600'
                                : 'border-gray-300'
                            }`}>
                              {isSelected && (
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className={`font-semibold mb-2 ${
                                isSelected ? 'text-green-800' : 'text-gray-800'
                              }`}>
                                {tema.title}
                              </h3>
                              <div className={`mt-2 ${isSelected ? 'pt-3 border-t border-green-200' : 'pt-2'}`}>
                                <p className={`text-sm mb-3 ${
                                  isSelected ? 'text-green-700' : 'text-gray-600'
                                }`}>
                                  {tema.description}
                                </p>
                                <div className={`text-xs ${
                                  isSelected ? 'text-green-600' : 'text-gray-600'
                                }`}>
                                  <p className="font-semibold mb-1">Coordinador:</p>
                                  <p className="mb-1">{tema.coordinator}</p>
                                  <p>Tel: {tema.coordinator_celphone}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                  {errors.tema && (
                    <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.tema}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Receipt Upload */}
            <div>
              <label htmlFor="receipt" className="block text-sm font-semibold text-gray-700 mb-2">
                <Upload className="w-4 h-4 inline mr-2 text-green-600" />
                Comprobante de Pago *
              </label>
              <div className="mt-2">
                <label
                  htmlFor="receipt"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    errors.receipt
                      ? 'border-red-300 bg-red-50 hover:border-red-400'
                      : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className={`w-8 h-8 mb-2 ${errors.receipt ? 'text-red-400' : 'text-gray-400'}`} />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click para subir</span> o arrastra el archivo
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF (MAX. 5MB)</p>
                  </div>
                  <input
                    ref={receiptRef}
                    type="file"
                    id="receipt"
                    name="receipt"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                </label>
                {errors.receipt && (
                  <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.receipt}
                  </p>
                )}
                {formData.receipt && !errors.receipt && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Archivo seleccionado: {formData.receipt.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={createParticipant.isPending}
                className={`w-full px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  createParticipant.isPending ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {createParticipant.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Enviar Inscripción
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CongresoForm
