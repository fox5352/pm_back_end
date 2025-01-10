import { useEffect, useState } from 'react';
import useSettings from '../../../../hooks/useSettings';
import { getFiles } from '../../../../lib/file';
import { FileEntry } from '@tauri-apps/api/fs';
import ImageButton from './ImageButton';

function ImageView() {
  const [imageFiles, setImageFiles] = useState<FileEntry[]>([]);
  //
  const { settings } = useSettings();
  const { imagesPath } = settings;

  useEffect(() => {
    const getImages = async () => {
      if (imagesPath) {
        let buffer: FileEntry[] = [];

        for (const path of imagesPath) {
          const entries = (await getFiles(path)).filter(
            (file) => file.name?.endsWith('.png') || file.name?.endsWith('.jpg')
          );

          buffer.push(...entries);
        }

        setImageFiles(buffer);
      }
    };

    getImages();
  }, [settings]);

  return (
    <div className="flex flex-row flex-wrap gap-3 justify-start w-full p-2 max-h-full overflow-y-auto">
      {imageFiles.length == 0 && 'Loading....'}
      <ImageButton path="" name={undefined} index={0} />
      {imageFiles.map((file, index) => (
        <ImageButton {...file} index={index + 1} key={index + 1} />
      ))}
    </div>
  );
}

export default ImageView;
