import { useState, useRef } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, AlertCircle, LogIn } from 'lucide-react'

interface LoginData {
  username: string
  password: string
}

interface LoginErrors {
  [key: string]: string
}

const LoginPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: ''
  })

  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'El usuario es requerido'
        return ''
      case 'password':
        if (!value.trim()) return 'La contraseña es requerida'
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError(null)
    }
  }

  const scrollToFirstError = (errorKeys: string[]) => {
    if (errorKeys.length === 0) return

    const firstErrorKey = errorKeys[0]
    const fieldRefs: { [key: string]: React.RefObject<HTMLElement> } = {
      username: usernameRef as React.RefObject<HTMLElement>,
      password: passwordRef as React.RefObject<HTMLElement>,
    }

    const ref = fieldRefs[firstErrorKey]
    if (ref?.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        if (ref.current instanceof HTMLInputElement) {
          ref.current.focus()
        }
      }, 100)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {}
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof LoginData])
      if (error) {
        newErrors[key] = error
      }
    })

    setErrors(newErrors)
    
    // Scroll to first error if validation fails
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(Object.keys(newErrors))
    }
    
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoginError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Implement actual login API call
      // const response = await loginService.login(formData)
      // Handle successful login (store token, redirect, etc.)
      
      console.log('Login attempt:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, just show an error message
      setLoginError('Credenciales inválidas. Por favor, verifica tu usuario y contraseña.')
    } catch (error: any) {
      console.error('Error logging in:', error)
      setLoginError(
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        'Error al iniciar sesión. Por favor, intenta nuevamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 sm:mb-6">
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Iniciar Sesión
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Ingresa tus credenciales para acceder
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10"
        >
          {/* Error Message */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 text-sm sm:text-base">
                  Error al iniciar sesión
                </p>
                <p className="text-red-700 text-xs sm:text-sm mt-1">
                  {loginError}
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2 text-green-600" />
                Usuario *
              </label>
              <input
                ref={usernameRef}
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.username
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                }`}
                placeholder="Ingresa tu usuario"
                autoComplete="username"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2 text-green-600" />
                Contraseña *
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.password
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                }`}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Iniciar Sesión
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

export default LoginPage
