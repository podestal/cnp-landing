import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  setTokens: (access: string, refresh: string) => void
  clearTokens: () => void
  initializeFromCookies: () => void
}

// Helper functions for cookies
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
}

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

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  setTokens: (access: string, refresh: string) => {
    // Save to cookies
    setCookie('access_token', access, 7)
    setCookie('refresh_token', refresh, 7)
    
    // Update Zustand state
    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    })
  },

  clearTokens: () => {
    // Remove from cookies
    deleteCookie('access_token')
    deleteCookie('refresh_token')
    
    // Update Zustand state
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  },

  initializeFromCookies: () => {
    const accessToken = getCookie('access_token')
    const refreshToken = getCookie('refresh_token')
    
    if (accessToken && refreshToken) {
      set({
        accessToken,
        refreshToken,
        isAuthenticated: true,
      })
    } else {
      // Clear state if no cookies found
      set({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      })
    }
  },
}))
