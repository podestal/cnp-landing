import APIClient from "./apiClient"

export interface Companion {
    id: number
    first_name: string
    last_name: string
    dni: string
    participant: number
    receipt: string
    is_active?: boolean
    created_at: string
    updated_at: string
}

export type CompanionRequest = Omit<Companion, 'id' | 'created_at' | 'updated_at'>

const companionService = new APIClient<Companion, CompanionRequest>('/companions/')

export const getCompanionsByParticipant = new APIClient<Companion[]>('/companions/by_participant/')

export default companionService