import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateField = (name: string, value: string) => {
    let error = ''
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'El nombre es requerido'
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'El correo electrónico es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Ingrese un correo electrónico válido'
        }
        break
      case 'phone':
        if (!value.trim()) {
          error = 'El teléfono es requerido'
        } else if (!/^[0-9+\s()-]{9,}$/.test(value)) {
          error = 'Ingrese un teléfono válido'
        }
        break
      case 'subject':
        if (!value.trim()) {
          error = 'El asunto es requerido'
        } else if (value.trim().length < 3) {
          error = 'El asunto debe tener al menos 3 caracteres'
        }
        break
      case 'message':
        if (!value.trim()) {
          error = 'El mensaje es requerido'
        } else if (value.trim().length < 10) {
          error = 'El mensaje debe tener al menos 10 caracteres'
        }
        break
    }
    
    return error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS configuration
      // You'll need to replace these with your actual EmailJS credentials
      const serviceId = 'YOUR_SERVICE_ID'
      const templateId = 'YOUR_TEMPLATE_ID'
      const publicKey = 'YOUR_PUBLIC_KEY'

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          to_email: 'notariospuno@hotmail.com',
        },
        publicKey
      )

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'notariospuno@hotmail.com',
      link: 'mailto:notariospuno@hotmail.com',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+051 364155',
      link: 'tel:+051364155',
    },
    {
      icon: MapPin,
      label: 'Dirección',
      value: 'Jr. Vilque N° 157, Puno - Puno',
      link: '#',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contacto
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad posible
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <motion.a
                        key={index}
                        href={info.link}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-start space-x-4 group"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-200">
                          <Icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500 mb-1">{info.label}</p>
                          <p className="text-gray-800 font-medium">{info.value}</p>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>

                {/* Office Hours */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Horario de Atención</h3>
                  <div className="space-y-2 text-gray-600">
                    <div>
                      <p className="font-semibold text-gray-800">Lunes a Viernes</p>
                      <p>Mañana: 09:00 am - 02:00 pm</p>
                      <p>Tarde: 04:00 pm - 07:00 pm</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Sábado</p>
                      <p>Mañana: 09:00 am - 12:00 pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Envíanos un Mensaje
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                      placeholder="Ingrese su nombre completo"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                        }`}
                        placeholder="correo@ejemplo.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          errors.phone
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                        }`}
                        placeholder="+051 123456789"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.subject
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                      placeholder="¿Sobre qué desea consultar?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      }`}
                      placeholder="Escriba su mensaje aquí..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-green-800 font-medium">
                        ¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <p className="text-red-800 font-medium">
                        Hubo un error al enviar el mensaje. Por favor, intente nuevamente.
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full md:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contacto

