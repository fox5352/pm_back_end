import { readTextFile } from '@tauri-apps/api/fs';
import { Content, Slide } from '../store/playlist';

export async function readFile(path: string): Promise<string | null> {
  try {
    return await readTextFile(path);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function readToSlides(path: string): Promise<Slide[] | null> {
  const res = await readFile(path);

  if (!res) return null;

  return res.split('\r\n\r\n').map(
    (text) =>
      ({
        id: `${Math.round(Math.random() * 999)}${Math.round(Math.random() * 999)}`,
        text: [
          {
            content: text,
            tag: 'p',
          } as Content,
        ],
        bg: null,
      }) as Slide
  );
}
