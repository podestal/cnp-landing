import { useQuery } from '@tanstack/react-query'
import { participantService, type ParticipantPaginatedResponse, type Participant } from '../../../services/api/participantService'
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

export interface UseGetParticipantsResult {
  participants: Participant[]
  count: number
  total_active: number
  total_inactive: number
  next: string | null
  previous: string | null
  isLoading: boolean
  error: Error | null
}

export const useGetParticipants = (page: number = 1, pageSize: number = 10, search?: string): UseGetParticipantsResult => {
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token')
  
  const params: Record<string, string> = {
    page: page.toString(),
    page_size: pageSize.toString(),
  }
  
  if (search && search.trim()) {
    params.search = search.trim()
  }
  
  const { data, isLoading, error } = useQuery<ParticipantPaginatedResponse>({
    queryKey: ['participants', page, pageSize, search],
    queryFn: () => participantService.get(accessToken || undefined, params),
  })

  return {
    participants: data?.results || [],
    count: data?.count || 0,
    total_active: data?.total_active || 0,
    total_inactive: data?.total_inactive || 0,
    next: data?.next || null,
    previous: data?.previous || null,
    isLoading,
    error: error as Error | null,
  }
}
