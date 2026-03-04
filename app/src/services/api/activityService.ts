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

export type updateActivityStatus = Omit<Activity, 'id' | 'created_at' | 'updated_at' | 'name' | 'day' | 'time'> & {
    is_active: boolean
}

const getActivityService = () => {
    return new APIClient<Activity[]>('/activities/')
}

export const getUpdateActivityStatusService = ({ id}: {id: number}) => {
    return new APIClient<updateActivityStatus>(`/activities/${id}/`)
}




export default getActivityService