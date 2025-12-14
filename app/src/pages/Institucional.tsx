import { motion } from 'framer-motion'
import { Users, Award, UserCheck } from 'lucide-react'

const Institucional = () => {
  const tribunal2025 = {
    titulares: [
      { name: 'RAUL SANTOS MONTESINOS SOLÓRZANO', role: 'MIEMBRO TITULAR' },
      { name: 'REYNALDO PANDIA MENDOZA', role: 'MIEMBRO TITULAR' },
      { name: 'HUMBERTO JUAN CALSIN COILA', role: 'MIEMBRO TITULAR' },
    ],
    suplentes: [
      { name: 'CÉSAR AUGUSTO GONZÁLES CÁCERES', role: 'MIEMBRO SUPLENTE' },
      { name: 'GUIDO MELECIO PERALTA AGUILAR', role: 'MIEMBRO SUPLENTE' },
      { name: 'SONIA MARIZELA ISÍA LARICO', role: 'MIEMBRO SUPLENTE' },
    ],
  }

  const tribunal2024 = {
    presidente: { name: 'ARTURO POMA RODRIGO', role: 'PRESIDENTE' },
    titulares: [
      { name: 'JESSIE TARCILA ZEGARRA CABRERA', role: 'PRIMER MIEMBRO TITULAR' },
      { name: 'IVAN FREDDY VILLAR GONZALES', role: 'SEGUNDO MIEMBRO TITULAR' },
    ],
    suplentes: [
      { name: 'MARCO ZULUAGA GUERRA', role: 'PRESIDENTE SUPLENTE' },
      { name: 'ASUNCION BEATRIZ GRACIA PONZE CUBA', role: 'PRIMER MIEMBRO SUPLENTE' },
      { name: 'RAÚL SANTOS MONTESINOS SOLÓRZANO', role: 'SEGUNDO MIEMBRO SUPLENTE' },
    ],
  }

  const getImageUrl = (name: string) => {
    // Generate a placeholder image URL based on the name
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=10b981&color=fff&bold=true&font-size=0.5`
  }

  const MemberCard = ({ member, index }: { member: { name: string; role: string }; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-shadow duration-300 flex flex-col items-center text-center"
    >
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-green-100">
        <img
          src={getImageUrl(member.name)}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-20 h-1 bg-green-600 mb-3" />
      <p className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wide">
        {member.role}
      </p>
      <h3 className="text-base font-bold text-gray-800 leading-tight">
        {member.name}
      </h3>
    </motion.div>
  )

  const PresidentCard = ({ member, index }: { member: { name: string; role: string }; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg hover:shadow-xl p-8 transition-shadow duration-300 flex flex-col items-center text-center text-white"
    >
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4 ring-4 ring-white/30">
        <img
          src={getImageUrl(member.name)}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-24 h-1 bg-white/50 mb-3" />
      <p className="text-sm font-semibold text-green-100 mb-2 uppercase tracking-wide">
        {member.role}
      </p>
      <h3 className="text-lg font-bold leading-tight">
        {member.name}
      </h3>
    </motion.div>
  )

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
              Institucional
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Conoce la estructura institucional del Colegio de Notarios de Puno
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Tribunal 2025 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                Tribunal de Honor 2025
              </h2>
            </div>
            <div className="w-32 h-1 bg-green-600 mx-auto mb-8" />
          </motion.div>

          {/* Miembros Titulares */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center flex items-center justify-center gap-2">
              <UserCheck className="w-6 h-6 text-green-600" />
              <span>Miembros Titulares</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tribunal2025.titulares.map((member, index) => (
                <MemberCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>

          {/* Miembros Suplentes */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-green-600" />
              <span>Miembros Suplentes</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tribunal2025.suplentes.map((member, index) => (
                <MemberCard key={member.name} member={member} index={index + 3} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tribunal 2024 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                Tribunal de Honor 2024
              </h2>
            </div>
            <div className="w-32 h-1 bg-green-600 mx-auto mb-8" />
          </motion.div>

          {/* Presidente */}
          <div className="mb-12">
            <div className="max-w-md mx-auto">
              <PresidentCard member={tribunal2024.presidente} index={0} />
            </div>
          </div>

          {/* Miembros Titulares */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center flex items-center justify-center gap-2">
              <UserCheck className="w-6 h-6 text-green-600" />
              <span>Miembros Titulares</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {tribunal2024.titulares.map((member, index) => (
                <MemberCard key={member.name} member={member} index={index + 1} />
              ))}
            </div>
          </div>

          {/* Miembros Suplentes */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-green-600" />
              <span>Miembros Suplentes</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tribunal2024.suplentes.map((member, index) => (
                <MemberCard key={member.name} member={member} index={index + 3} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Institucional

