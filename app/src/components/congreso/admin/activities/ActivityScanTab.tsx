import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useGetActivities } from '../../../../hooks/api/activity/useGetActivities'
import type { Activity } from '../../../../services/api/activityService'

const ActivityScanTab = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const { data: activities, isLoading, error } = useGetActivities()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-200 rounded-lg p-4"
      >
        <p className="text-red-600">Error al cargar actividades. Por favor, intenta nuevamente.</p>
      </motion.div>
    )
  }

  // Filter only active activities for the selector
  const activeActivities = activities?.filter(activity => activity.is_active) || []

  return (
    <div className="space-y-6">
      {/* Activity Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Seleccionar Actividad</h2>
        {activeActivities.length > 0 ? (
          <div>
            <label htmlFor="activity-select" className="block text-sm font-medium text-gray-700 mb-2">
              Actividad
            </label>
            <select
              id="activity-select"
              value={selectedActivity?.id || ''}
              onChange={(e) => {
                const activityId = parseInt(e.target.value)
                const activity = activities?.find(a => a.id === activityId) || null
                setSelectedActivity(activity)
              }}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
            >
              <option value="">Selecciona una actividad</option>
              {activeActivities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name} - {activity.day} {activity.time}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-gray-600">No hay actividades activas disponibles</p>
        )}
      </motion.div>

      {/* QR Scanner Section - Will be implemented next */}
      {selectedActivity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Escanear Código QR - {selectedActivity.name}
          </h2>
          <p className="text-gray-600 mb-4">
            Escanea el código QR del participante para registrarlo en esta actividad
          </p>
          {/* QR Scanner will go here */}
          <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
            Escáner QR (próximamente)
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ActivityScanTab
