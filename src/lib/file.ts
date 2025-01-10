import { open } from '@tauri-apps/api/dialog';
import {
  FileEntry,
  readBinaryFile,
  readDir,
  readTextFile,
} from '@tauri-apps/api/fs';
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

export async function getDirectory(): Promise<string[]> {
  try {
    const selected = await open({
      directory: true,
      multiple: true,
    });

    if (typeof selected === 'string') {
      return [selected];
    } else if (Array.isArray(selected) && selected.length > 0) {
      return selected; // Return the first selected directory
    } else {
      console.log('No directory selected.');
      return [];
    }
  } catch (error) {
    console.error('failed to get directory :', error);
    return [];
  }
}

export async function getImage(path: string): Promise<Blob | null> {
  try {
    const imageData = await readBinaryFile(path);

    const blob = new Blob([new Uint8Array(imageData)], {
      type: `image/${path.split('.').pop()}`,
    });

    return blob;
  } catch (error) {
    console.error('Failed to get image:', error);
    return null;
  }
}

export async function getFiles(path: string): Promise<FileEntry[]> {
  try {
    const entries: FileEntry[] = await readDir(path, { recursive: true });

    return entries;
  } catch (error) {
    console.error('failed to get lyrics :', error);
    return [];
  }
}
