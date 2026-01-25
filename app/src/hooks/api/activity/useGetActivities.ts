import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import getActivityService, { type Activity } from '../../../services/api/activityService'
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

export const useGetActivities = (): UseQueryResult<Activity[], Error> => {
  const accessToken = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.accessToken) || getCookie('access_token')
  const activityService = getActivityService()
  
  return useQuery<Activity[], Error>({
    queryKey: ['activities'],
    queryFn: () => activityService.get(accessToken || undefined),
  })
}
