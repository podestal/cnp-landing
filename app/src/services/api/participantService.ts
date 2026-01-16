import APIClient from "./apiClient"

export interface Participant {
    id?: number
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
    created_at?: string
    updated_at?: string
}

export type CreateParticipant = Omit<Participant, 'is_active' | 'created_at' | 'updated_at' | 'id'>

export type ParticipantResponse = Participant[]

export const participantService = new APIClient<ParticipantResponse>('/participants/')