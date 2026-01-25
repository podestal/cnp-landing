import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useGetActivities } from '../../../../hooks/api/activity/useGetActivities'
import { useUpdateActivityStatus } from '../../../../hooks/api/activity/useUpdateActivityStatus'
import { useNotificationStore } from '../../../../utils/notificationStore'
import type { Activity } from '../../../../services/api/activityService'

const ActivityManageTab = () => {
  const { data: activities, isLoading, error } = useGetActivities()
  const updateActivityStatus = useUpdateActivityStatus()
  const addNotification = useNotificationStore((state: ReturnType<typeof useNotificationStore.getState>) => state.addNotification)
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set())

  const handleToggleStatus = async (activity: Activity) => {
    setUpdatingIds(prev => new Set(prev).add(activity.id))
    
    try {
      await updateActivityStatus.mutateAsync({
        id: activity.id,
        data: { is_active: !activity.is_active },
      })
      
      addNotification({
        type: 'success',
        message: `Actividad ${!activity.is_active ? 'activada' : 'desactivada'} exitosamente`,
      })
    } catch (error) {
      console.error('Error updating activity status:', error)
      addNotification({
        type: 'error',
        message: 'Error al actualizar el estado de la actividad. Por favor, intenta nuevamente.',
      })
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(activity.id)
        return newSet
      })
    }
  }

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
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activity.is_active}
                    onChange={() => handleToggleStatus(activity)}
                    disabled={updatingIds.has(activity.id) || updateActivityStatus.isPending}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"></div>
                </label>
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
