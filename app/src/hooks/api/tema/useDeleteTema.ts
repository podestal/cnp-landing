import { useMutation, useQueryClient } from '@tanstack/react-query'
import APIClient from '../../../services/api/apiClient'

export const useDeleteTema = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: (id: number) => {
      const deleteClient = new APIClient<void>(`/temas/${id}/`)
      return deleteClient.delete()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temas'] })
    },
  })
}
