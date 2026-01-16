import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { participantService, type ParticipantResponse } from '../../../services/api/participantService'

export const useGetParticipants = (): UseQueryResult<ParticipantResponse> => {
  return useQuery<ParticipantResponse>({
    queryKey: ['participants'],
    queryFn: () => participantService.get(),
  })
}
