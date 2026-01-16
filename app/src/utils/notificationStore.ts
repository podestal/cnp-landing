import { create } from 'zustand'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000,
    }
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }))

    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }))
      }, newNotification.duration)
    }
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  },
}))
