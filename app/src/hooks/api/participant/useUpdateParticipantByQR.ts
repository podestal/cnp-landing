import { useMutation, useQueryClient } from '@tanstack/react-query'
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

interface UpdateActivityByQRData {
  qr: string
  activity_id: number
}

interface UpdateActivityByQRResponse {
  message?: string
  success?: boolean
}

export const useUpdateParticipantByQR = () => {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token')
  const updateActivityByQRService = new APIClient<UpdateActivityByQRResponse, UpdateActivityByQRData>('/participants/update_activity_by_qr/')

  return useMutation<UpdateActivityByQRResponse, Error, UpdateActivityByQRData>({
    mutationFn: (data: UpdateActivityByQRData) => {
      return updateActivityByQRService.post(data, accessToken || undefined)
    },
    onSuccess: () => {
      // Invalidate participants and activities queries
      queryClient.invalidateQueries({ queryKey: ['participants'] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}
