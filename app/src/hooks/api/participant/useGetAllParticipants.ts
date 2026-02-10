import { useQuery } from '@tanstack/react-query'
import { getAllParticipants, type Participant } from '../../../services/api/participantService'
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

export const useGetAllParticipants = () => {
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token') || ''

  return useQuery<Participant[]>({
    queryKey: ['participants', 'all'],
    queryFn: () => getAllParticipants.get(accessToken || undefined),
  })
}
