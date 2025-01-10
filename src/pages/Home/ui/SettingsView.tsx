import { useEffect, useState } from 'react';
import { MdAddBox, MdSave } from 'react-icons/md';

import useSettings, { Settings } from '../../../hooks/useSettings';
import { getDirectory } from '../../../lib/file';
import { cn } from '../../../lib/css';

export default function () {
  const { settings, updateSettings } = useSettings();
  const [saved, setSaved] = useState(false);
  const [imagesPaths, setImagesPaths] = useState<string[]>([]);
  const [lyricsPaths, setLyricsPaths] = useState<string[]>([]);

  const addLyricPath = async () => {
    const paths = await getDirectory();

    setLyricsPaths((prev) => [...prev, ...paths]);
  };
  const removeLyricPath = (path: string) => {
    setLyricsPaths((prev) => [
      ...prev.filter((lyricPath) => lyricPath != path),
    ]);
  };

  const addImagePaths = async () => {
    const paths = await getDirectory();

    setImagesPaths((prev) => [...prev, ...paths]);
  };
  const removeImagePaths = (path: string) => {
    setImagesPaths((prev) => [
      ...prev.filter((imagePath) => imagePath != path),
    ]);
  };

  const saveSettings = async () => {
    const newSettings = {
      imagesPath: imagesPaths,
      lyricsPath: lyricsPaths,
    } as Settings;

    await updateSettings(newSettings);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1200);
  };

  useEffect(() => {
    setImagesPaths(settings.imagesPath);
    setLyricsPaths(settings.lyricsPath);
  }, [settings]);

  return (
    <div
      className={`flex flex-col w-full h-full overflow-y-auto ${cn(saved, 'bg-green-50')}`}
    >
      {/* lyrics paths */}
      <div className="flex flex-col w-full p-1 border-b-2 border-[--border-one] bg-transparent">
        <div className="flex flex-row justify-between w-full px-1 text-xl">
          <h2>Lyrics Paths</h2>
          <button
            onClick={addLyricPath}
            className="text-2xl text-[--ac-two] hover:text-[--ac-one] hover:scale-90 transition-all duration-200"
          >
            <MdAddBox />
          </button>
        </div>
        <div className="flex flex-col items-start h-[116px] space-y-0.5 border-2 border-[--border-one] relative overflow-y-auto">
          {lyricsPaths.map((path, index) => (
            <button
              onClick={() => removeLyricPath(path)}
              key={index}
              className="w-full px-1 py-0.5 text-start text-[--text-two] bg-[--ac-two] hover:bg-[crimson] duration-100 ease-linear transition-all"
            >
              {path}
            </button>
          ))}
        </div>
      </div>
      {/* images paths */}
      <div className="flex flex-col w-full p-1 border-b-2 border-[--border-one] bg-transparent">
        <div className="flex flex-row justify-between w-full px-1 text-xl">
          <h2>Images Paths</h2>
          <button
            onClick={addImagePaths}
            className="text-2xl text-[--ac-two] hover:text-[--ac-one] hover:scale-90 transition-all duration-200"
          >
            <MdAddBox />
          </button>
        </div>
        <div className="flex flex-col items-start h-[116px] space-y-0.5 border-2 border-[--border-one] relative overflow-y-auto">
          {imagesPaths.map((path, index) => (
            <button
              onClick={() => removeImagePaths(path)}
              key={index}
              className="w-full px-1 py-0.5 text-start text-[--text-two] bg-[--ac-two] hover:bg-[crimson] duration-100 ease-linear transition-all"
            >
              {path}
            </button>
          ))}
        </div>
      </div>

      {/* TODO: controls */}
      <div className="flex w-full p-1">
        <button
          onClick={saveSettings}
          disabled={saved}
          className=" px-2 py-1 text-xl text-[--text-two] rounded bg-green-500 hover:scale-90 duration-100 ease-linear transition-all"
        >
          <MdSave />
        </button>
      </div>
    </div>
  );
}
