import { motion } from 'framer-motion'
import { Award, Users, UserCheck } from 'lucide-react'

const InstitucionalTribunalHonor = () => {
  const tribunal2025 = {
    titulares: [
      { name: 'RAUL SANTOS MONTESINOS SOLÓRZANO', role: 'MIEMBRO TITULAR', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/raul%20santos.png' },
      { name: 'REYNALDO PANDIA MENDOZA', role: 'MIEMBRO TITULAR', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/Reynaldo-Pandia.png' },
      { name: 'HUMBERTO JUAN CALSIN COILA', role: 'MIEMBRO TITULAR', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/Juan-Calsin.png' },
    ],
    suplentes: [
      { name: 'CÉSAR AUGUSTO GONZÁLES CÁCERES', role: 'MIEMBRO SUPLENTE', image: '' },
      { name: 'GUIDO MELECIO PERALTA AGUILAR', role: 'MIEMBRO SUPLENTE', image: 'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp-staff/guido-melecio.png' },
      { name: 'SONIA MARIZELA ISÍA LARICO', role: 'MIEMBRO SUPLENTE', image: '' },
    ],
  }

  // const tribunal2024 = {
  //   presidente: { name: 'ARTURO POMA RODRIGO', role: 'PRESIDENTE', image: '' },
  //   titulares: [
  //     { name: 'JESSIE TARCILA ZEGARRA CABRERA', role: 'PRIMER MIEMBRO TITULAR', image: '' },
  //     { name: 'IVAN FREDDY VILLAR GONZALES', role: 'SEGUNDO MIEMBRO TITULAR', image: '' },
  //   ],
  //   suplentes: [
  //     { name: 'MARCO ZULUAGA GUERRA', role: 'PRESIDENTE SUPLENTE', image: '' },
  //     { name: 'ASUNCION BEATRIZ GRACIA PONZE CUBA', role: 'PRIMER MIEMBRO SUPLENTE', image: '' },
  //     { name: 'RAÚL SANTOS MONTESINOS SOLÓRZANO', role: 'SEGUNDO MIEMBRO SUPLENTE', image: '' },
  //   ],
  // }

  const getImageUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=10b981&color=fff&bold=true&font-size=0.5`
  }

  const MemberCard = ({ member, index }: { member: { name: string; role: string; image?: string }; index: number }) => {
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
        <h3 className="text-base font-bold text-gray-800 leading-tight">
          {member.name}
        </h3>
      </motion.div>
    )
  }

  // const PresidentCard = ({ member, index }: { member: { name: string; role: string; image?: string }; index: number }) => {
  //   const hasImage = member.image && member.image.trim()
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0, y: 30 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
  //       whileHover={{ y: -5, transition: { duration: 0.3 } }}
  //       className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg hover:shadow-xl p-8 transition-shadow duration-300 flex flex-col items-center text-center text-white"
  //     >
  //       <div className={`w-40 h-40 rounded-full overflow-hidden mb-4 ${hasImage ? '' : 'ring-4 ring-white/30'}`}>
  //         <img
  //           src={hasImage ? member.image : getImageUrl(member.name)}
  //           alt={member.name}
  //           className="w-full h-full object-cover"
  //         />
  //       </div>
  //     <div className="w-24 h-1 bg-white/50 mb-3" />
  //     <p className="text-sm font-semibold text-green-100 mb-2 uppercase tracking-wide">
  //       {member.role}
  //     </p>
  //       <h3 className="text-lg font-bold leading-tight">
  //         {member.name}
  //       </h3>
  //     </motion.div>
  //   )
  // }

  return (
    <>
      {/* Tribunal 2025 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
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
    </>
  )
}

export default InstitucionalTribunalHonor

