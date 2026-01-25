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

  return (
    <div className="space-y-6">
      {/* Activity Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Seleccionar Actividad</h2>
        {activities && activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${
                    selectedActivity?.id === activity.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                  ${!activity.is_active ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                disabled={!activity.is_active}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{activity.name}</h3>
                  {!activity.is_active && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      Inactiva
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {activity.day} - {activity.time}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No hay actividades disponibles</p>
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
