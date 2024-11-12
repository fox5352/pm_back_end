export type DisplayScreen = {
  className?: string;
};

export default function DisplayScreen({ className }: DisplayScreen) {

  return (<section className={` ${className}`}></section>);
}
