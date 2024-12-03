import ControlBar from './ui/ControlBar';
import Tabs from './ui/Tabs';
import DisplayScreen from '../../ui/DisplayScreen';
import PlaylistSection from './ui/playlistSection';

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* controls */}
      <ControlBar />
      {/* Tab & preview window */}
      <div className="flex w-full h-[60vh]">
        <Tabs />
        <DisplayScreen className="max-w-[45%]" preview={true} />
      </div>
      {/* playlist section */}
      <PlaylistSection />
    </main>
  );
}
