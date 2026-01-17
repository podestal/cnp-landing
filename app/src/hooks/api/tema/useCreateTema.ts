import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Tema } from '../../../services/api/temaService'
import APIClient from '../../../services/api/apiClient'

export interface CreateTemaData {
  title: string
  description: string
  coordinator: string
  coordinator_celphone: string
}

export const useCreateTema = () => {
  const queryClient = useQueryClient()
  const createClient = new APIClient<Tema, CreateTemaData>('/temas/')

  return useMutation<Tema, Error, CreateTemaData>({
    mutationFn: (data: CreateTemaData) => createClient.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temas'] })
    },
  })
}
