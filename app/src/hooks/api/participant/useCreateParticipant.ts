import { useMutation } from '@tanstack/react-query'
import { participantService, type Participant } from '../../../services/api/participantService'

export const useCreateParticipant = () => {
  return useMutation<Participant, Error, FormData>({
    mutationFn: (formData: FormData) => {
      return participantService.post(formData) as Promise<Participant>
    },
  })
}
