import APIClient from "./apiClient"


export interface Activity {
    id: number
    name: string
    day: string
    time: string
    is_active: boolean
    created_at: string
    updated_at: string
}

const getActivityService = () => {
    return new APIClient<Activity[]>('/activities/')
}

export default getActivityService