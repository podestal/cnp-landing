import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { temaService, type TemaResponse } from '../../../services/api/temaService'

export const useGetTemas = (): UseQueryResult<TemaResponse> => {
  return useQuery<TemaResponse>({
    queryKey: ['temas'],
    queryFn: () => temaService.get(),
  })
}
