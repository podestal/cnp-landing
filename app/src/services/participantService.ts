import APIClient from "./apiClient"

export interface Participant {
    name: string
    last_name: string
    dni: string
    email: string
    celphone: string
    ruc: string
    location: string
    receipt: string
    is_active: boolean
    tema: number
}

export type CreateParticipant = Omit<Participant, 'is_active' | 'created_at' | 'updated_at'>

export const participantService = new APIClient<Participant>('/participants')