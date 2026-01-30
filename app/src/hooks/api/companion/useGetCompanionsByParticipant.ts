import { useQuery } from '@tanstack/react-query'
import { getCompanionsByParticipant } from '../../../services/api/companionService'
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

interface UseGetCompanionsByParticipantProps {
  participantId: number | undefined
  enabled?: boolean
}

export const useGetCompanionsByParticipant = ({ participantId, enabled = true }: UseGetCompanionsByParticipantProps) => {
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token') || ''

  return useQuery({
    queryKey: ['companions', 'by_participant', participantId],
    queryFn: () => getCompanionsByParticipant.get(accessToken, { participant_id: participantId?.toString() || '' }),
    enabled: enabled && !!participantId && !!accessToken,
  })
}
