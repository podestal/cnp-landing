import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { type Participant } from '../../../services/api/participantService'
import APIClient from '../../../services/api/apiClient'

export const useCreateParticipant = (): UseMutationResult<Participant, Error, FormData> => {
  // Create a client for single participant operations (POST returns a single Participant, not an array)
  const createClient = new APIClient<Participant>('/participants/')
  
  return useMutation<Participant, Error, FormData>({
    mutationFn: (formData: FormData) => createClient.post(formData),
  })
}
