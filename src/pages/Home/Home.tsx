import ControlBar from "./ui/ControlBar";
import PlaylistSection from "./ui/playlistSection";
import Tabs from "./ui/Tabs";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* controls */}
      <ControlBar />
      {/* Tab & preview window */}
      <div className="flex w-full h-[60vh]">
        <Tabs />
      </div>
      {/* playlist section */}
      <PlaylistSection />
    </main>
  );
}
