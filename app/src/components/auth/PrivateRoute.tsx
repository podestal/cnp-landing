import { Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.isAuthenticated)
  const initializeFromCookies = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.initializeFromCookies)

  // Initialize auth state from cookies on mount
  useEffect(() => {
    initializeFromCookies()
  }, [initializeFromCookies])

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If authenticated, render children
  return <>{children}</>
}

export default PrivateRoute
