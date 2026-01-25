import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useGetActivities } from '../../../../hooks/api/activity/useGetActivities'

const ActivityManageTab = () => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Gestionar Actividades</h2>
      {activities && activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{activity.name}</h3>
                <p className="text-sm text-gray-600">
                  {activity.day} - {activity.time}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activity.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {activity.is_active ? 'Activa' : 'Inactiva'}
                </span>
                {/* Toggle button will be implemented next */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No hay actividades disponibles</p>
      )}
    </motion.div>
  )
}

export default ActivityManageTab
