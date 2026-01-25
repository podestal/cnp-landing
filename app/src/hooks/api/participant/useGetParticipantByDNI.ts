import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { getParticipantByDni, type Participant } from "../../../services/api/participantService"

interface Props {
    access: string
    dni: string
}

export const useGetParticipantByDNI = ({ access, dni }: Props): UseQueryResult<Participant, Error> => {
    return useQuery({
        queryKey: ['participant', dni],
        queryFn: () => getParticipantByDni.get(access, { dni }),
        enabled: dni.length === 8,
    })
}