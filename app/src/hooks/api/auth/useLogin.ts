import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginService, type LoginRequest, type LoginResponse } from '../../../services/auth/loginService'
import { useNotificationStore } from '../../../utils/notificationStore'
import { useAuthStore } from '../../../store/authStore'

export const useLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const addNotification = useNotificationStore((state) => state.addNotification)
  const setTokens = useAuthStore((state) => state.setTokens)

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials: LoginRequest) => loginService.login(credentials),
    onSuccess: (data) => {
      // Store tokens in Zustand (which also saves to cookies and localStorage)
      setTokens(data.access, data.refresh)
      
      // Show success notification
      addNotification({
        type: 'success',
        message: 'Inicio de sesión exitoso',
      })
      
      // Redirect to the original route or default to admin dashboard
      const from = (location.state as { from?: Location })?.from
      const redirectTo = from?.pathname || '/congreso2026/admin'
      navigate(redirectTo, { replace: true })
    },
    onError: (error: any) => {
      // Error notification will be handled by the component
      console.error('Login error:', error)
    },
  })
}
