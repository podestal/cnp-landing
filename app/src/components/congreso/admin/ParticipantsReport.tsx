import { motion } from 'framer-motion'
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { useGetParticipants } from '../../../hooks/api/participant/useGetParticipants'
import { useGetCompanions } from '../../../hooks/api/companion/useGetCompanions'

const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899']

const ParticipantsReport = () => {
  // Get all participants for the report (no pagination, no filters)
  const { participants, count, total_active, total_inactive, isLoading } = useGetParticipants(1, 1000)
  
  // Get all companions for the report
  const { data: companionsData, isLoading: isLoadingCompanions } = useGetCompanions()
  const companions = companionsData || []

  // Calculate metrics
  const activePercentage = count > 0 ? ((total_active / count) * 100).toFixed(1) : 0
  const inactivePercentage = count > 0 ? ((total_inactive / count) * 100).toFixed(1) : 0
  
  // Calculate companion metrics
  const totalCompanions = companions.length
  const activeCompanions = companions.filter((c: { is_active?: boolean }) => c.is_active).length
  const inactiveCompanions = companions.filter((c: { is_active?: boolean }) => !c.is_active).length
  const activeCompanionsPercentage = totalCompanions > 0 ? ((activeCompanions / totalCompanions) * 100).toFixed(1) : 0
  const participantsWithCompanions = new Set(companions.map((c: { participant: number }) => c.participant)).size
  const avgCompanionsPerParticipant = count > 0 ? (totalCompanions / count).toFixed(2) : 0

  // Group by registration date (simplified - using created_at)
  const registrationsByDate = participants.reduce((acc: Record<string, number>, participant) => {
    if (participant.created_at) {
      const date = new Date(participant.created_at).toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      })
      acc[date] = (acc[date] || 0) + 1
    }
    return acc
  }, {})

  const registrationData = Object.entries(registrationsByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(-30) // Last 30 days

  // Status distribution for pie chart (participants)
  const participantStatusData = [
    { name: 'Activos', value: total_active, color: '#10b981' },
    { name: 'Inactivos', value: total_inactive, color: '#ef4444' },
  ]

  // Status distribution for pie chart (companions)
  const companionStatusData = [
    { name: 'Activos', value: activeCompanions, color: '#10b981' },
    { name: 'Inactivos', value: inactiveCompanions, color: '#ef4444' },
  ]

  // Companions by registration date
  const companionsByDate = companions.reduce((acc: Record<string, number>, companion: { created_at?: string }) => {
    if (companion.created_at) {
      const date = new Date(companion.created_at).toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      })
      acc[date] = (acc[date] || 0) + 1
    }
    return acc
  }, {})

  const companionRegistrationData = Object.entries(companionsByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(-30) // Last 30 days

  const dailyCompanionRegistrations = companionRegistrationData.map(item => ({
    date: item.date,
    registrations: item.count,
  }))

  // Daily registrations for area chart
  const dailyRegistrations = registrationData.map(item => ({
    date: item.date,
    registrations: item.count,
  }))

  // Calculate growth rate (comparing last 7 days vs previous 7 days)
  const last7Days = registrationData.slice(-7).reduce((sum, item) => sum + item.count, 0)
  const previous7Days = registrationData.slice(-14, -7).reduce((sum, item) => sum + item.count, 0)
  const growthRate = previous7Days > 0 
    ? (((last7Days - previous7Days) / previous7Days) * 100).toFixed(1)
    : '0.0'

  if (isLoading || isLoadingCompanions) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Activity className="w-8 h-8 text-green-600 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600">Cargando reporte...</p>
          </div>
        </div>
      </div>
    )
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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Reporte de Participantes
              </h1>
              <p className="text-gray-600 mt-1">
                Análisis completo y estadísticas detalladas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics - Participants */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-600" />
            Métricas de Participantes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total de Participantes</p>
            <p className="text-3xl font-bold text-gray-800">{count}</p>
            <p className="text-xs text-gray-500 mt-2">Registrados en total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Participantes Activos</p>
            <p className="text-3xl font-bold text-green-600">{total_active}</p>
            <p className="text-xs text-gray-500 mt-2">{activePercentage}% del total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <Activity className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Participantes Inactivos</p>
            <p className="text-3xl font-bold text-red-600">{total_inactive}</p>
            <p className="text-xs text-gray-500 mt-2">{inactivePercentage}% del total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Tasa de Crecimiento</p>
            <p className={`text-3xl font-bold ${parseFloat(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growthRate}%
            </p>
            <p className="text-xs text-gray-500 mt-2">Últimos 7 días</p>
          </motion.div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Distribución de Participantes por Estado</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={participantStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {participantStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Registration Trends Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Tendencias de Registro de Participantes</h2>
            </div>
            {dailyRegistrations.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p>No hay datos de registro disponibles</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Companions Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Companion Status Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Distribución de Acompañantes por Estado</h2>
            </div>
            {totalCompanions > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={companionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {companionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p>No hay acompañantes registrados</p>
              </div>
            )}
          </motion.div>

          {/* Companion Registration Trends Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">Tendencias de Registro de Acompañantes</h2>
            </div>
            {dailyCompanionRegistrations.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyCompanionRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p>No hay datos de registro disponibles</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Daily Registrations Bar Chart */}
        {registrationData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Registros Diarios (Últimos 30 días)</h2>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={11}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]}>
                  {registrationData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-600" />
            Resumen Ejecutivo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-2">Participantes</h3>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm text-gray-600">Total de Registros</p>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-600">Tasa de Actividad</p>
                <p className="text-2xl font-bold text-blue-600">{activePercentage}%</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm text-gray-600">Registros en últimos 7 días</p>
                <p className="text-2xl font-bold text-purple-600">{last7Days}</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-sm text-gray-600">Tasa de Crecimiento</p>
                <p className={`text-2xl font-bold ${parseFloat(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {growthRate}%
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-2">Acompañantes</h3>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-600">Total de Acompañantes</p>
                <p className="text-2xl font-bold text-blue-600">{totalCompanions}</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm text-gray-600">Tasa de Actividad</p>
                <p className="text-2xl font-bold text-green-600">{activeCompanionsPercentage}%</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm text-gray-600">Participantes con Acompañantes</p>
                <p className="text-2xl font-bold text-purple-600">{participantsWithCompanions}</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-sm text-gray-600">Promedio por Participante</p>
                <p className="text-2xl font-bold text-orange-600">{avgCompanionsPerParticipant}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ParticipantsReport
