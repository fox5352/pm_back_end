import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Bible } from '../../../../api/requests';

import { debounce } from '../../../../lib/tools';

import styles from './bibleview.module.css';
import BookContainer from './BookContainer';
import { fuzz, SearchResult } from '../../../../lib/fuzz';

type DataRef = {
  tag: any | null;
  pat: string;
};

export default function BibleView() {
  const containerRef = useRef<HTMLDivElement>(null);
  // reference to the input element
  const inputRef = useRef<HTMLInputElement>(null);
  // state for search input and search results
  const [searchTerm, setSearchTerm] = useState('');
  // state for tracking clicks on buttons
  const bookDataRef = useRef<DataRef>({ tag: null, pat: '*' });

  const chapterDataRef = useRef<DataRef>({ tag: null, pat: '*' });

  const verseTagRef = useRef<DataRef>({ tag: null, pat: '*' });

  const snapShotOfBible = useMemo(
    () => Bible.getBibleData,
    [Bible.getBibleData]
  );

  const debouncedInput = debounce((string: string) => {
    const id: SearchResult = fuzz(string.toLowerCase());

    if (inputRef.current && containerRef.current) {
      if (id.book) {
        const containerTop = containerRef.current.getBoundingClientRect().top;

        const bookTag: HTMLElement | null = document.getElementById(id.book);

        if (!bookTag) return;

        /* click button once */
        if (
          bookDataRef.current.pat == '*' ||
          id.book != bookDataRef.current.pat
        ) {
          const bRectTop = bookTag.getBoundingClientRect().top;
          containerRef.current.scrollBy(0, bRectTop - containerTop);
          bookDataRef.current.tag = bookTag;
          bookDataRef.current.pat = id.book;

          bookTag.click();
        }

        if (id.chapter) {
          const chapterTag: HTMLElement | null = document.getElementById(
            id.chapter
          );

          if (!chapterTag) return;

          // click button once
          if (
            chapterDataRef.current.tag == null ||
            id.chapter != chapterDataRef.current.pat
          ) {
            const cRectTop = chapterTag?.getBoundingClientRect().top;
            containerRef.current.scrollBy(0, cRectTop - containerTop);
            chapterDataRef.current.tag = chapterTag;
            chapterDataRef.current.pat = id.chapter;
            chapterTag?.click();
          }

          if (id.verse) {
            const verseTag: HTMLElement | null = document.getElementById(
              id.verse
            );

            if (!verseTag) return;

            // click button once
            if (
              verseTagRef.current.tag == null ||
              id.verse != verseTagRef.current?.pat
            ) {
              verseTagRef.current.tag = verseTag;
              verseTagRef.current.pat = id.verse;
              const vRectTop = verseTag.getBoundingClientRect().top;
              containerRef.current.scrollBy(0, vRectTop - containerTop);
            }
          } else {
            verseTagRef.current.tag?.click();
            verseTagRef.current.tag = null;
            bookDataRef.current.pat = '*';
          }
        } else {
          chapterDataRef.current.tag.click();
          chapterDataRef.current.tag = null;
          chapterDataRef.current.pat = '*';
        }
      } else {
        bookDataRef.current.tag.click();
        bookDataRef.current.tag = null;
        bookDataRef.current.pat = '*';
      }
    }
  }, 500);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    debouncedInput(term);
    setSearchTerm(term);
  };

  const keyListener = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
    }
  };

  const addKeyTracker = () => {
    window.addEventListener('keypress', keyListener);
  };
  const removeKeyTracker = () => {
    window.removeEventListener('keypress', keyListener);
  };

  useEffect(() => {
    if (inputRef.current == null) return;

    inputRef.current.addEventListener('focus', addKeyTracker);
    inputRef.current.addEventListener('blur', removeKeyTracker);

    return () => {
      if (inputRef.current == null) return;

      inputRef.current.removeEventListener('focus', addKeyTracker);
      inputRef.current.removeEventListener('blur', removeKeyTracker);
    };
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.input_container}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={searchTerm}
          onChange={handleInput}
        />
      </div>
      <div ref={containerRef} className={styles.bible_view_content}>
        {snapShotOfBible.map((book, index) => (
          <BookContainer key={index} {...book} />
        ))}
      </div>
    </div>
  );
}
