import { create } from "zustand";

export type Slide = {
  id: string;
  text: string;
  bg: string | null
}

export type Playlist = {
  list: Slide[];
  bg: string | null;
  index: number;
};

type Actions = {
  setIndex: (data: number) => void;
  setBg: (data: string | null) => void;
  addSlide: ({ id, text }: { id: string, text: string }) => void;
  removeSlide: (id: string) => void
  // TODO: update slide
}


export const usePlaylist = create<Playlist & Actions>()((set) => ({
  list: [],
  bg: null,
  index: 0,
  setIndex: (data) => set((state) => ({ ...state, index: data })),
  setBg: (data) => set((state) => ({ ...state, bg: data })),
  addSlide: (data) => set((state) => ({
    ...state,
    list: [...state.list, { ...data, bg: null }]
  })),
  removeSlide: (data) => set((state) => ({
    ...state,
    list: state.list.filter(item => item.id != data)
  }))
}))
