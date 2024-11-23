import { create } from 'zustand';

type State = {
  isLive: boolean;
};

type Actions = {
  toggleIsLive: () => void;
};

export const useDisplay = create<State & Actions>()((set) => ({
  isLive: false,
  toggleIsLive: () => set((state) => ({ ...state, isLive: !state.isLive })),
}));
