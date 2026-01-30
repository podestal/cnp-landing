import { useMutation, type useMutationResult } from "@tanstack/react-query"
import companionService, { type CompanionRequest, type Companion } from "../../../services/api/companionService"

interface Props {
    data: CompanionRequest
}

const useCreateCompanion = ({ data }: Props): useMutationResult<Companion, Error, CompanionRequest> => {
    return useMutation({
        mutationFn: companionService.post(data),
        onSuccess: (res) => {
            console.log('Companion created successfully', res)
        },
        onError: (error) => {
            console.log('Error creating companion', error)
        },
    })
}

export default useCreateCompanion