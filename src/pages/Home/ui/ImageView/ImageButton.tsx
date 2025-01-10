import { FileEntry } from '@tauri-apps/api/fs';
import { useEffect, useState } from 'react';
import { setBg } from '../../../../store/playlist';
import { getImage } from '../../../../lib/file';

export default function ImageButton({ path }: { index: number } & FileEntry) {
  const [image, setImage] = useState<string | null>(null);

  const handleClick = () => {
    if (image) {
      setBg(image);
    } else {
      setBg('none');
    }
  };

  useEffect(() => {
    const get = async () => {
      const blob = await getImage(path);

      if (blob) {
        const url = URL.createObjectURL(blob);
        setImage(url);

        return () => URL.revokeObjectURL(url);
      }
    };

    get();
  }, []);

  return (
    <button
      onClick={handleClick}
      className="max-w-[23%] w-full h-32 rounded bg-[--bg-one]"
    >
      {image != null && <img className="" src={image} />}
    </button>
  );
}
