import { motion } from 'framer-motion'
import { Building2, Users, UserCheck } from 'lucide-react'

const InstitucionalJuntaDirectiva = () => {
  const juntaDirectiva2025 = {
    decano: { name: 'HELARD SALVADOR MEDINA CÁCERES', role: 'DECANO', dni: '02292313', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/helard-medina.png' },
    viceDecano: { name: 'EVA MARINA CENTENO ZAVALA', role: 'VICE DECANO', dni: '01212852', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/Marina-Centeno.png' },
    secretario: { name: 'RENEE RODOLFO RODRIGUEZ ZEA', role: 'SECRETARIO', dni: '02423157', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/rene-rodriguez.png' },
    tesorero: { name: 'ROGER SALLUCA HUARAYA', role: 'TESORERO', dni: '10721438', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/Roger-Salluca.png' },
    fiscal: { name: 'IVÁN FREDDY VILLAR GONZALES', role: 'FISCAL', dni: '02297480', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/Freddy-Villar.png' },
    vocales: [
      { name: 'JESSIE TARCILA ZEGARRA CABRERA', role: 'VOCAL', dni: '30422745', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/Jessie-Zegarra.png' },
      { name: 'ENRIQUE ANTONIO PATIÑO PATIÑO', role: 'VOCAL', dni: '01296531', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/enrique-patino.png' },
      { name: 'ISRAEL RUBÍN DE CELIS ATENCIO', role: 'VOCAL', dni: '29352441', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/Israel-Rubin.png' },
    ],
  }

  const getImageUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=10b981&color=fff&bold=true&font-size=0.5`
  }

  const MemberCard = ({ member, index, showDni }: { member: { name: string; role: string; dni?: string; image?: string }; index: number; showDni?: boolean }) => {
    const hasImage = member.image && member.image.trim()
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-shadow duration-300 flex flex-col items-center text-center"
      >
        <div className={`w-32 h-32 rounded-full overflow-hidden mb-4 ${hasImage ? '' : 'ring-4 ring-green-100'}`}>
          <img
            src={hasImage ? member.image : getImageUrl(member.name)}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      <div className="w-20 h-1 bg-green-600 mb-3" />
      <p className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wide">
        {member.role}
      </p>
      <h3 className="text-base font-bold text-gray-800 leading-tight mb-2">
        {member.name}
      </h3>
        {showDni && member.dni && (
          <p className="text-xs text-gray-500">
            DNI: {member.dni}
          </p>
        )}
      </motion.div>
    )
  }

  const DecanoCard = ({ member, index }: { member: { name: string; role: string; dni: string; image?: string }; index: number }) => {
    const hasImage = member.image && member.image.trim()
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg hover:shadow-xl p-8 transition-shadow duration-300 flex flex-col items-center text-center text-white"
      >
        <div className={`w-40 h-40 rounded-full bg-white overflow-hidden mb-4 ${hasImage ? '' : 'ring-4 ring-white/30'}`}>
          <img
            src={hasImage ? member.image : getImageUrl(member.name)}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      <div className="w-24 h-1 bg-white/50 mb-3" />
      <p className="text-sm font-semibold text-green-100 mb-2 uppercase tracking-wide">
        {member.role}
      </p>
      <h3 className="text-lg font-bold leading-tight mb-2">
        {member.name}
      </h3>
        <p className="text-xs text-green-100">
          DNI: {member.dni}
        </p>
      </motion.div>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
              Junta Directiva 2025
            </h2>
          </div>
          <div className="w-32 h-1 bg-green-600 mx-auto mb-8" />
        </motion.div>

        {/* Decano */}
        <div className="mb-12">
          <div className="max-w-md mx-auto">
            <DecanoCard member={juntaDirectiva2025.decano} index={0} />
          </div>
        </div>

        {/* Vice Decano, Secretario, Tesorero, Fiscal */}
        <div className="mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center flex items-center justify-center gap-2">
            <UserCheck className="w-6 h-6 text-green-600" />
            <span>Directivos</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <MemberCard member={juntaDirectiva2025.viceDecano} index={1} showDni />
            <MemberCard member={juntaDirectiva2025.secretario} index={2} showDni />
            <MemberCard member={juntaDirectiva2025.tesorero} index={3} showDni />
            <MemberCard member={juntaDirectiva2025.fiscal} index={4} showDni />
          </div>
        </div>

        {/* Vocales */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-green-600" />
            <span>Vocales</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {juntaDirectiva2025.vocales.map((member, index) => (
              <MemberCard key={member.name} member={member} index={index + 5} showDni />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstitucionalJuntaDirectiva

