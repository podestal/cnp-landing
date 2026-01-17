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

export interface CreateTemaData {
  title: string
  description: string
  coordinator: string
  coordinator_celphone: string
}

export const useCreateTema = () => {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((state) => state.accessToken) || getCookie('access_token')
  const createClient = new APIClient<Tema, CreateTemaData>('/temas/')

  return useMutation<Tema, Error, CreateTemaData>({
    mutationFn: (data: CreateTemaData) => createClient.post(data, accessToken || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temas'] })
    },
  })
}
