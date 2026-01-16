import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useNotificationStore } from './notificationStore'

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotificationStore()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5" />
      case 'error':
        return <AlertCircle className="w-5 h-5" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      case 'info':
        return <Info className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: 'text-green-600',
        }
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-600',
        }
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-600',
        }
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-600',
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: 'text-gray-600',
        }
    }
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => {
          const styles = getStyles(notification.type)
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
              className={`${styles.bg} ${styles.border} border rounded-lg shadow-lg p-4 pointer-events-auto`}
            >
              <div className="flex items-start gap-3">
                <div className={`${styles.icon} shrink-0 mt-0.5`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`${styles.text} text-sm font-medium`}>
                    {notification.message}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className={`${styles.text} hover:opacity-70 transition-opacity shrink-0`}
                  aria-label="Cerrar notificación"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default NotificationContainer
