import { create } from 'zustand'
import type { Participant } from '../services/api/participantService'

interface ParticipantRegistrationState {
  participant: Participant | null
  setParticipant: (participant: Participant) => void
  clearParticipant: () => void
}

export const useParticipantRegistrationStore = create<ParticipantRegistrationState>((set) => ({
  participant: null,
  setParticipant: (participant: Participant) => {
    set({ participant })
  },
  clearParticipant: () => {
    set({ participant: null })
  },
}))
