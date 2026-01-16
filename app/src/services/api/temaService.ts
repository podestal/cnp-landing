import APIClient from "./apiClient"

export interface Tema {
    id: number
    title: string
    description: string
    coordinator: string
    coordinator_celphone: string
    created_at: string
    updated_at: string
}

export type TemaResponse = Tema[]

export const temaService = new APIClient<TemaResponse>('/temas')