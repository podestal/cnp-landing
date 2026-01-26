import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateParticipantByQR, type Participant } from '../../../services/api/participantService'
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

interface RegisterParticipantQRData {
  dni: string
  qr: string
}

export const useRegisterParticipantQR = () => {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token')

  return useMutation<Participant, Error, RegisterParticipantQRData>({
    mutationFn: (data: RegisterParticipantQRData) => {
      return updateParticipantByQR.post(data, accessToken || undefined)
    },
    onSuccess: () => {
      // Invalidate participants queries
      queryClient.invalidateQueries({ queryKey: ['participants'] })
      queryClient.invalidateQueries({ queryKey: ['participant'] })
    },
  })
}
