import { BaseDirectory, pictureDir, audioDir } from '@tauri-apps/api/path';
import { createDir, exists, readTextFile, writeFile } from '@tauri-apps/api/fs';
import { useEffect, useState } from 'react';

export type Settings = {
  lyricsPath: string[];
  imagesPath: string[];
  //
};

type Action = {
  updateSettings: (newSettings: Settings) => Promise<void>;
};

export default function useSettings(): {
  settings: Settings;
} & Action {
  const [settings, setSettings] = useState<Settings>({
    lyricsPath: [],
    imagesPath: [],
  });

  const getSettings = async () => {
    try {
      // First check if the config directory exists
      const configExists = await exists('', {
        dir: BaseDirectory.AppConfig,
      });

      if (!configExists) {
        await createDir('', {
          dir: BaseDirectory.AppConfig,
          recursive: true,
        });
      }

      // Check if settings file exists in AppConfig directory
      const fileExists = await exists('settings.json', {
        dir: BaseDirectory.AppConfig,
      });

      if (!fileExists) {
        // Create initial settings file
        const settings: Settings = {
          imagesPath: [await pictureDir()],
          lyricsPath: [await audioDir()],
        };

        await writeFile('settings.json', JSON.stringify(settings), {
          dir: BaseDirectory.AppConfig,
        });

        getSettings();
      } else {
        // Read existing settings
        const fileContents = await readTextFile('settings.json', {
          dir: BaseDirectory.AppConfig,
        });

        const loadedSettings = JSON.parse(fileContents);
        setSettings(loadedSettings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  // Add function to update settings
  const updateSettings = async (newSettings: Settings) => {
    try {
      await writeFile('settings.json', JSON.stringify(newSettings), {
        dir: BaseDirectory.AppConfig,
      });
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  };

  return { settings, updateSettings };
}
