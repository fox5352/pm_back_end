import { useEffect } from 'react';
import useSettings from '../../../hooks/useSettings';

export default function () {
  const { settings } = useSettings();

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  return (
    <div className="flex flex-col w-full overflow-y-auto">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis, quae
      doloribus eum, corporis quo possimus voluptatem, reprehenderit mollitia
      voluptas omnis numquam harum repellat nesciunt deleniti quidem voluptates
      dolorem tempora?
    </div>
  );
}
