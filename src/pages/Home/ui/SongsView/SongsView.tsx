import { useEffect, useState } from 'react';
import { FileEntry } from '@tauri-apps/api/fs';

import useSettings from '../../../../hooks/useSettings';

import { getFiles } from '../../../../lib/file';
import LyricsButton from './LyricButton';

function SongsView() {
  const [lyricsFiles, setLyricsFiles] = useState<FileEntry[]>([]);
  //
  const { settings } = useSettings();
  const { lyricsPath } = settings;

  useEffect(() => {
    const getLyrics = async () => {
      if (lyricsPath) {
        let buffer: FileEntry[] = [];

        for (const path of lyricsPath) {
          const entries = (await getFiles(path)).filter((file) =>
            file.name?.endsWith('.txt')
          );
          buffer.push(...entries);
        }

        setLyricsFiles(buffer);
      }
    };

    getLyrics();
  }, [settings]);

  return (
    <div className="flex flex-col w-full max-h-full overflow-y-auto">
      {/* TODO: add search later
      <div className="px-1.5 text-md border-b-2 border-[--border-one]">
        header
      </div>
      */}
      <div>
        {lyricsFiles.map((file, index) => (
          <LyricsButton {...file} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default SongsView;
