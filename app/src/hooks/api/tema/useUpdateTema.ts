import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Tema } from '../../../services/api/temaService'
import APIClient from '../../../services/api/apiClient'
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

export interface UpdateTemaData {
  title?: string
  description?: string
  coordinator?: string
  coordinator_celphone?: string
}

export const useUpdateTema = () => {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((state) => state.accessToken) || getCookie('access_token')

  return useMutation<Tema, Error, { id: number; data: UpdateTemaData }>({
    mutationFn: ({ id, data }: { id: number; data: UpdateTemaData }) => {
      const updateClient = new APIClient<Tema, UpdateTemaData>(`/temas/${id}/`)
      return updateClient.update(data, accessToken || undefined)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temas'] })
    },
  })
}
