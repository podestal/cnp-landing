import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { useAuthStore } from '../store/authStore'

// Helper function to get cookie
const getCookie = (name: string): string | null => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {
  // Request interceptor: Add access token to requests
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get token from cookie
      const accessToken = getCookie('access_token')
      if (accessToken && config.headers) {
        config.headers.Authorization = `JWT ${accessToken}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor: Handle token refresh on 401 errors
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

      // If error is 401 and we haven't tried to refresh yet
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          // Get refresh token from cookie
          const refreshToken = getCookie('refresh_token')
          if (!refreshToken) {
            // No refresh token, clear auth and redirect to login
            const authStore = useAuthStore.getState()
            authStore.clearTokens()
            window.location.href = '/login'
            return Promise.reject(error)
          }

          // Make refresh request directly (without interceptors to avoid circular dependency)
          // Create a new axios instance without interceptors for the refresh call
          const refreshInstance = axios.create({
            baseURL: axiosInstance.defaults.baseURL,
          })
          
          const refreshResponse = await refreshInstance.post<{ access: string }>('/jwt/refresh/', {
            refresh: refreshToken,
          })
          
          const newAccessToken = refreshResponse.data.access
          
          // Update tokens in store (which also updates cookies)
          const authStore = useAuthStore.getState()
          authStore.setTokens(newAccessToken, refreshToken)

          // Retry the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `JWT ${newAccessToken}`
          }
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          // Refresh failed, clear auth and redirect to login
          const authStore = useAuthStore.getState()
          authStore.clearTokens()
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )
}
