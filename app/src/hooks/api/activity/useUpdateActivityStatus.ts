import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getUpdateActivityStatusService, type updateActivityStatus, type Activity } from '../../../services/api/activityService'
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

export const useUpdateActivityStatus = () => {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token')

  return useMutation<updateActivityStatus, Error, { id: number; data: updateActivityStatus }>({
    mutationFn: ({ id, data }: { id: number; data: updateActivityStatus }) => {
      const updateService = getUpdateActivityStatusService({ id })
      return updateService.update(data, accessToken || undefined)
    },
    onSuccess: () => {
      // Invalidate and refetch activities list
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}
