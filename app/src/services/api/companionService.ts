import APIClient from "./apiClient"

interface Companion {
    id: number
    first_name: string
    last_name: string
    dni: string
    participant: number
    created_at: string
    updated_at: string
}

type CompanionRequest = Omit<Companion, 'id' | 'created_at' | 'updated_at'>


const companionService = new APIClient<Companion, CompanionRequest>('/companions/')

export default companionService