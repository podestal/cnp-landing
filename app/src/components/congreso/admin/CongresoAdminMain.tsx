import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Mail, Phone, MapPin, FileText, CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react'
import { useGetParticipants } from '../../../hooks/api/participant/useGetParticipants'
import type { Participant } from '../../../services/api/participantService'

const CongresoAdminMain = () => {
  const { data: participants, isLoading, error } = useGetParticipants()
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

        {/* Participants Table/Cards */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Cargando participantes...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <p className="text-red-600 font-semibold mb-2">Error al cargar participantes</p>
            <p className="text-gray-600">Por favor, intenta nuevamente más tarde.</p>
          </div>
        ) : filteredParticipants.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold mb-2">
              {searchTerm || filterActive !== null ? 'No se encontraron participantes' : 'No hay participantes registrados'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-green-600 hover:text-green-700 underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Participante</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Documentos</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ubicación</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredParticipants.map((participant: Participant, index: number) => (
                    <motion.tr
                      key={participant.id || index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {participant.name} {participant.last_name}
                          </p>
                          <p className="text-sm text-gray-500">ID: {participant.id || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4 text-green-600" />
                            {participant.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4 text-green-600" />
                            {participant.celphone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">
                            <span className="font-semibold">DNI:</span> {participant.dni}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">RUC:</span> {participant.ruc}
                          </p>
                          {participant.receipt && (
                            <div className="flex items-center gap-2 text-green-600">
                              <FileText className="w-4 h-4" />
                              <span className="text-xs">Comprobante</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-green-600" />
                          {participant.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          participant.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {participant.is_active ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              Activo
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              Inactivo
                            </>
                          )}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredParticipants.map((participant: Participant, index: number) => (
                <motion.div
                  key={participant.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 sm:p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {participant.name} {participant.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">ID: {participant.id || 'N/A'}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      participant.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {participant.is_active ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Activo
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          Inactivo
                        </>
                      )}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="text-sm text-gray-800">{participant.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Teléfono</p>
                        <p className="text-sm text-gray-800">{participant.celphone}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">DNI</p>
                        <p className="text-sm font-semibold text-gray-800">{participant.dni}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">RUC</p>
                        <p className="text-sm font-semibold text-gray-800">{participant.ruc}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Ubicación</p>
                        <p className="text-sm text-gray-800">{participant.location}</p>
                      </div>
                    </div>

                    {participant.receipt && (
                      <div className="flex items-center gap-2 text-green-600">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Comprobante de pago disponible</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
