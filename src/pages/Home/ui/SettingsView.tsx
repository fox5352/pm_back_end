import { useEffect } from 'react';
import useSettings from '../../../hooks/useSettings';

export default function () {
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis, quae
      doloribus eum, corporis quo possimus voluptatem, reprehenderit mollitia
      voluptas omnis numquam harum repellat nesciunt deleniti quidem voluptates
      dolorem tempora?
    </div>
  );
}
