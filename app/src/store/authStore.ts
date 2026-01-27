import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  userId: string | null
  isAuthenticated: boolean
  setTokens: (access: string, refresh: string) => void
  clearTokens: () => void
  initializeFromCookies: () => void
}

// Helper function to decode JWT token and extract user ID
const decodeJWT = (token: string): string | null => {
  try {
    // JWT has 3 parts: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }
    
    // Decode the payload (second part)
    const payload = parts[1]
    // Replace URL-safe base64 characters
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    // Add padding if needed
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    // Decode base64
    const decoded = atob(padded)
    // Parse JSON
    const parsed = JSON.parse(decoded)
    
    // Try different common field names for user ID
    const id = parsed.user_id || parsed.userId || parsed.id || null
    // Convert to string if it's a number
    return id !== null ? String(id) : null
  } catch (error) {
    console.error('Error decoding JWT token:', error)
    return null
  }
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
  userId: null,
  isAuthenticated: false,

  setTokens: (access: string, refresh: string) => {
    // Decode JWT to extract user ID
    const userId = decodeJWT(access)
    
    // Save to cookies
    setCookie('access_token', access, 7)
    setCookie('refresh_token', refresh, 7)
    
    // Update Zustand state
    set({
      accessToken: access,
      refreshToken: refresh,
      userId: userId,
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
      userId: null,
      isAuthenticated: false,
    })
  },

  initializeFromCookies: () => {
    const accessToken = getCookie('access_token')
    const refreshToken = getCookie('refresh_token')
    
    if (accessToken && refreshToken) {
      // Decode JWT to extract user ID
      const userId = decodeJWT(accessToken)
      
      set({
        accessToken,
        refreshToken,
        userId: userId,
        isAuthenticated: true,
      })
    } else {
      // Clear state if no cookies found
      set({
        accessToken: null,
        refreshToken: null,
        userId: null,
        isAuthenticated: false,
      })
    }
  },
}))
