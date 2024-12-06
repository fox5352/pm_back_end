import { get } from './invoke';

export type VerseSlide = {
  type: string;
  payload: {
    book_name: string;
    chapter_name: string;
    chapter_num: string;
    verse_num: string;
    text: string;
  };
};

export type SongSlide = {
  type: string;
  payload: unknown; // TODO: impl later
};

export type Content = {
  tag: 'h2' | 'h1' | 'p';
  content: string;
};

export type Slide = {
  id: string;
  text: Content[];
  bg: string | null;
};

export type Playlist = {
  list: Slide[];
  bg: string | null;
  index: number | null;
};

export async function setIndex(idx: number | null) {
  const res = await get('set_index', { idx });

  if (res.error) {
    console.error('Failed to set index:', res.message);
    return;
  }
}

export async function setBg(bg: string | null) {
  const res = await get('set_bg', { bg });

  if (res.error) {
    console.error('Failed to set background:', res.message);
    return;
  }
}

export async function addSlide(slide: Slide) {
  const res = await get('add_slide', { slide });

  if (res.error) {
    console.error('Failed to add slide:', res.message);
    return;
  }
}

export async function removeSlide(id: string) {
  const res = await get('remove_slide', { id });

  if (res.error) {
    console.error('Failed to remove slide:', res.message);
    return;
  }
}

export async function updateSlide(slide: Slide) {
  const res = await get('update_slide', { slide });

  if (res.error) {
    console.error('Failed to update slide:', res.message);
    return;
  }
}

export async function getList(): Promise<Slide[] | []> {
  const res = await get<Slide[]>('get_list');

  if (res.error) {
    console.error('Failed to get playlist:', res.message);
    return [];
  } else {
    return res.data;
  }
}

export async function getListItem(index: number): Promise<Slide | null> {
  const res = await get<Slide>('get_list_item', { index });

  if (res.error) {
    console.error('Failed to get list item:', res.message);
    return null;
  } else {
    return res.data;
  }
}

export async function getBg(): Promise<string | null> {
  const res = await get<string | null>('get_bg');

  if (res.error) {
    console.error('Failed to get live status:', res.message);
    return null;
  } else {
    return res.data;
  }
}

export async function getIndex(): Promise<number | null> {
  const res = await get<number | null>('get_index');

  if (res.error) {
    console.error('Failed to get index:', res.message);
    return null;
  } else {
    return res.data;
  }
}
