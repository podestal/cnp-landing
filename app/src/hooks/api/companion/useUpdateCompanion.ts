import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Companion } from '../../../services/api/companionService'
import APIClient from '../../../services/api/apiClient'
import { useAuthStore } from '../../../store/authStore'

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

interface UpdateCompanionData {
  id: number
  data: Partial<Companion>
}

export const useUpdateCompanion = () => {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token')

  return useMutation({
    mutationFn: ({ id, data }: UpdateCompanionData) => {
      // Create a client for this specific companion
      const updateClient = new APIClient<Companion>(`/companions/${id}/`)
      return updateClient.update(data, accessToken || undefined)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
    },
  })
}
