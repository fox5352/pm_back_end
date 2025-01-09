import { useEffect, useMemo, useState } from 'react';
import { FileEntry, readDir } from '@tauri-apps/api/fs';

import useSettings from '../../../../hooks/useSettings';

import styles from './SongsView.module.css';

function SongsView() {
  const [lyricsFiles, setLyricsFiles] = useState<FileEntry[]>([]);
  //
  const { settings } = useSettings();
  const { lyricsPath } = settings;

  useEffect(() => {
    const getFiles = async (path: string): Promise<FileEntry[]> => {
      try {
        const entries: FileEntry[] = await readDir(path, { recursive: true });

        return entries.filter((file) => file.name?.endsWith('.txt'));
      } catch (error) {
        console.error('failed to get lyrics :', error);
        return [];
      }
    };

    const getLyrics = async () => {
      if (lyricsPath) {
        let buffer: FileEntry[] = [];

        for (const path of lyricsPath) {
          const entries = await getFiles(path);
          buffer.push(...entries);
        }

        console.log(buffer);

        setLyricsFiles(buffer);
      }
    };

    getLyrics();
  }, [settings]);

  return (
    <div className="flex flex-col w-full max-h-full overflow-y-auto">
      <div className="border-b-2 border-[--border-one]">header</div>
      <div>
        {lyricsFiles.map((file, index) => (
          <LyricsFile {...file} index={index} />
        ))}
      </div>
    </div>
  );
}

function LyricsFile({
  name,
  path,
  index,
  children,
}: { index: number } & FileEntry) {
  const prettyName = useMemo(() => name?.split('.')[0], [name]);

  useEffect(() => {}, [index, name]);

  return (
    <div
      className="flex flex-col items-start border-2 border-[--border-one]  p-0.5 px-1 text-start hover:border-[--ac-one] hover:bg-[--ac-one] hover:text-[--text-two] duration-100 transition-all ease-linear space-y-1"
      key={index}
    >
      {prettyName}
    </div>
  );
}

export default SongsView;