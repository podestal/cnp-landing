import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Tema } from '../../../services/api/temaService'
import APIClient from '../../../services/api/apiClient'

export interface UpdateTemaData {
  title?: string
  description?: string
  coordinator?: string
  coordinator_celphone?: string
}

export const useUpdateTema = () => {
  const queryClient = useQueryClient()

  return useMutation<Tema, Error, { id: number; data: UpdateTemaData }>({
    mutationFn: ({ id, data }: { id: number; data: UpdateTemaData }) => {
      const updateClient = new APIClient<Tema, UpdateTemaData>(`/temas/${id}/`)
      return updateClient.update(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temas'] })
    },
  })
}
