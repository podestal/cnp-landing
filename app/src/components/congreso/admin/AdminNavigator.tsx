import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, BookOpen, Calendar, LogOut, UserPlus } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'
import { useNotificationStore } from '../../../utils/notificationStore'

const AdminNavigator = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const clearTokens = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.clearTokens)
  const addNotification = useNotificationStore((state: ReturnType<typeof useNotificationStore.getState>) => state.addNotification)

  const menuItems = [
    {
      path: '/congreso2026/admin',
      label: 'Participantes',
      icon: Users,
    },
    {
      path: '/congreso2026/registrar-participante',
      label: 'Registrar',
      icon: UserPlus,
    },
    {
      path: '/congreso2026/temas',
      label: 'Temas',
      icon: BookOpen,
    },
    {
      path: '/congreso2026/actividades',
      label: 'Actividades',
      icon: Calendar,
    },
  ]

  const handleLogout = () => {
    clearTokens()
    addNotification({
      type: 'success',
      message: 'Sesión cerrada exitosamente',
    })
    navigate('/login')
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800 shadow-2xl"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex flex-col items-center justify-center gap-1 flex-1 h-full
                transition-all duration-200
                ${active ? 'text-green-500' : 'text-gray-400'}
              `}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-green-500' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${active ? 'text-green-500' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-t-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-gray-400 hover:text-red-400 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs font-medium">Salir</span>
        </button>
      </div>
    </motion.nav>
  )
}

export default AdminNavigator
