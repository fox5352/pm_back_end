import DisplayScreen from '../../ui/DisplayScreen';

export default function Live() {
  return (
    <main className="overflow-hidden w-screen h-screen">
      <DisplayScreen preview={false} />
    </main>
  );
}
