import { useMemo, useState } from "react";
import { Bible, Book, Chapter } from "../../../api/requests";

import styles from "./bibleview.module.css";

export default function BibleView() {
  const snapShotOfBible = useMemo(
    () => Bible.getBibleData,
    [Bible.getBibleData],
  );

  return (
    <div className={styles.body}>
      <div className={styles.input_container}>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.bible_view_content}>
        {snapShotOfBible.map((book, index) => (
          <BookContainer key={index} {...book} />
        ))}
      </div>
    </div>
  );
}

type BookContainer = Book & {};

function BookContainer({ book_name, book, chapters }: BookContainer) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggle = () => setIsActive((prev) => !prev);

  const mapper = (data: Chapter) => {
    let buffer = [];

    for (const [key, value] of Object.entries(data)) {
      buffer.push(
        <ChapterContainer
          key={key}
          book_name={book_name}
          book={book}
          chapter={{ key: value }}
        />,
      );
    }

    return buffer.length > 0 ? buffer : null;
  };

  return (
    <div
      onClick={() => {
        isActive && toggle();
      }}
      className="flex flex-col items-start border-2 border-[--border-one] hover:border-[--ac-one] hover:bg-[--ac-one] hover:text-[--text-two] duration-100 transition-all ease-linear"
    >
      <button onClick={toggle} className="w-full p-0.5 px-1 text-start">
        {book_name}
      </button>
      {isActive && (
        <div className="flex flex-col w-full px-1 border-t-2 border-[--bg-one]">
          {mapper(chapters)}
        </div>
      )}
    </div>
  );
}

type ChapterContainer = {
  book_name: string;
  book: number;
  chapter: Chapter;
};

function ChapterContainer(data: ChapterContainer) {
  console.log(data);
  return <div>test</div>;
}
