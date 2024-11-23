import { create } from 'zustand';

export type Slide = {
  id: string;
  text: string;
  bg: string | null;
};

export type Playlist = {
  list: Slide[];
  bg: string | null;
  index: number | null;
};

type Actions = {
  setIndex: (data: number | null) => void;
  setBg: (data: string | null) => void;
  addSlide: ({ id, text }: { id: string; text: string }) => void;
  removeSlide: (id: string) => void;
  updateSlide: ({
    id,
    text,
    bg,
  }: {
    id?: string;
    text?: string;
    bg?: string;
  }) => void;
};

export const usePlaylist = create<Playlist & Actions>()((set) => ({
  list: [],
  bg: null,
  index: null,
  setIndex: (data) => set((state) => ({ ...state, index: data })),
  setBg: (data) => set((state) => ({ ...state, bg: data })),
  addSlide: (data) =>
    set((state) => ({
      ...state,
      list: [...state.list, { ...data, bg: null }],
    })),
  removeSlide: (data) =>
    set((state) => ({
      ...state,
      list: state.list.filter((item) => item.id != data),
    })),
  updateSlide: (data) =>
    set((state) => {
      let buffer = state.list;
      for (let index = 0; index < buffer.length; index++) {
        const slide = buffer[index];
        if (slide.id === data.id) {
          buffer[index] = {
            id: data.id ? data.id : slide.id,
            text: data.text ? data.text : slide.text,
            bg: data.bg ? data.bg : slide.bg,
          };
          break;
        }
      }

      return { ...state, list: buffer };
    }),
}));
