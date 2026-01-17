import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Participant } from '../../../services/api/participantService'
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

export const useUpdateParticipant = () => {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token')

  return useMutation<Participant, Error, { id: number; data: Partial<Participant> }>({
    mutationFn: ({ id, data }: { id: number; data: Partial<Participant> }) => {
      // Create a temporary client for this specific participant update
      // Use Partial<Participant> as RequestType since we're only updating some fields
      const updateClient = new APIClient<Participant, Partial<Participant>>(`/participants/${id}/`)
      return updateClient.update(data, accessToken || undefined)
    },
    onSuccess: () => {
      // Invalidate and refetch participants list
      queryClient.invalidateQueries({ queryKey: ['participants'] })
    },
  })
}
