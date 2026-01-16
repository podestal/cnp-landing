import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, CheckCircle2, XCircle } from 'lucide-react'
import { useGetParticipants } from '../../../hooks/api/participant/useGetParticipants'
import { useUpdateParticipant } from '../../../hooks/api/participant/useUpdateParticipant'
import type { Participant } from '../../../services/api/participantService'
import ParticipantsList from './ParticipantsList'

const CongresoAdminMain = () => {
  const { data: participants, isLoading, error } = useGetParticipants()
  const updateParticipant = useUpdateParticipant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState<boolean | null>(null)

  // Filter participants based on search and active status
  const filteredParticipants = participants?.filter((participant: Participant) => {
    const matchesSearch = 
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.dni.includes(searchTerm) ||
      participant.celphone.includes(searchTerm)
    
    const matchesFilter = filterActive === null || participant.is_active === filterActive
    
    return matchesSearch && matchesFilter
  }) || []

  const activeCount = participants?.filter((p: Participant) => p.is_active).length || 0
  const totalCount = participants?.length || 0

  const handleActivate = async (participant: Participant) => {
    if (!participant.id) return

    try {
      await updateParticipant.mutateAsync({
        id: participant.id,
        data: { is_active: true }
      })
    } catch (error) {
      console.error('Error activating participant:', error)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Dashboard de Participantes
            </h1>
          </div>
          <p className="text-gray-600">
            Gestiona y visualiza todos los participantes inscritos al congreso
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">{totalCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Activos</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{activeCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Inactivos</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">{totalCount - activeCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email, DNI, teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterActive(null)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterActive === null
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterActive(true)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterActive === true
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Activos
              </button>
              <button
                onClick={() => setFilterActive(false)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterActive === false
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inactivos
              </button>
            </div>
          </div>
        </motion.div>

        {/* Participants List */}
        <ParticipantsList
          participants={filteredParticipants}
          isLoading={isLoading}
          error={error}
          onActivate={handleActivate}
          updatingParticipantId={updateParticipant.isPending ? (updateParticipant.variables?.id || null) : null}
        />

        {/* Results Count */}
        {filteredParticipants.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Mostrando {filteredParticipants.length} de {totalCount} participantes
          </div>
        )}
      </div>
    </div>
  )
}

export default CongresoAdminMain
