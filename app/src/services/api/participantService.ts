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
    qr_code?: string
    created_at?: string
    updated_at?: string
    activities?: any[]
}

export type CreateParticipant = Omit<Participant, 'is_active' | 'created_at' | 'updated_at' | 'id' | 'activities'>

export interface ParticipantPaginatedResponse {
    count: number
    total_active: number
    total_inactive: number
    next: string | null
    previous: string | null
    results: Participant[]
}

export const participantService = new APIClient<ParticipantPaginatedResponse>('/participants/')