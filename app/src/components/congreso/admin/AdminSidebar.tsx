import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Users, BookOpen, Calendar, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../../store/authStore'
import { useNotificationStore } from '../../../utils/notificationStore'

const AdminSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const clearTokens = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.clearTokens)
  const addNotification = useNotificationStore((state: ReturnType<typeof useNotificationStore.getState>) => state.addNotification)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      path: '/congreso2026/admin',
      label: 'Participantes',
      icon: Users,
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
    <>
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside
        className={`
          hidden lg:flex fixed lg:sticky top-0 left-0 h-screen z-50
          ${isCollapsed ? 'w-20' : 'w-64'} bg-black text-white shadow-xl border-r border-gray-800
          flex-col
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Header */}
        <div className={`p-6 border-b border-gray-800 ${isCollapsed ? 'px-3' : ''}`}>
          {!isCollapsed && (
            <>
              <h2 className="text-xl font-bold text-white">Panel de Administración</h2>
              <p className="text-sm text-gray-400 mt-1">Congreso 2026</p>
            </>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CNP</span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full items-center justify-center border-2 border-black transition-colors z-10"
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg
                      transition-all duration-200
                      group relative
                      ${
                        active
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400'} shrink-0`} />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    {isCollapsed && (
                      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className={`p-4 border-t border-gray-800 ${isCollapsed ? 'px-3' : ''}`}>
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg
              bg-red-900/30 text-red-400 hover:bg-red-900/50 hover:text-red-300
              border border-red-800/50 hover:border-red-700
              transition-all duration-200 font-medium
              group relative
            `}
            title={isCollapsed ? 'Cerrar Sesión' : ''}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Salir</span>}
            {isCollapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                Cerrar Sesión
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
