import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import companionService, { type Companion } from "../../../services/api/companionService"

export const useCreateCompanion = (): UseMutationResult<Companion, Error, FormData> => {
    return useMutation({
        mutationFn: (data: FormData) => companionService.post(data),
    })
}