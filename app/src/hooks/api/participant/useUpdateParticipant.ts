import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Participant } from '../../../services/api/participantService'
import APIClient from '../../../services/api/apiClient'

export const useUpdateParticipant = () => {
  const queryClient = useQueryClient()

  return useMutation<Participant, Error, { id: number; data: Partial<Participant> }>({
    mutationFn: ({ id, data }: { id: number; data: Partial<Participant> }) => {
      // Create a temporary client for this specific participant update
      // Use Partial<Participant> as RequestType since we're only updating some fields
      const updateClient = new APIClient<Participant, Partial<Participant>>(`/participants/${id}/`)
      return updateClient.update(data)
    },
    onSuccess: () => {
      // Invalidate and refetch participants list
      queryClient.invalidateQueries({ queryKey: ['participants'] })
    },
  })
}
