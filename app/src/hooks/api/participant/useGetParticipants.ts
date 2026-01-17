import { useQuery } from '@tanstack/react-query'
import { participantService, type ParticipantPaginatedResponse, type Participant } from '../../../services/api/participantService'

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

export const useGetParticipants = (page: number = 1, pageSize: number = 10): UseGetParticipantsResult => {
  const { data, isLoading, error } = useQuery<ParticipantPaginatedResponse>({
    queryKey: ['participants', page, pageSize],
    queryFn: () => participantService.get(undefined, { page: page.toString(), page_size: pageSize.toString() }),
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
