import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { Bible } from '../../../../api/requests';

import { debounce } from '../../../../lib/tools';

import styles from './bibleview.module.css';
import BookContainer from './BookContainer';
import { fuzz, SearchResult } from '../../../../lib/fuzz';

export default function BibleView() {
  const containerRef = useRef<HTMLDivElement>(null);
  // reference to the input element
  const inputRef = useRef<HTMLInputElement>(null);
  // state for search input and search results
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult>({
    book: null,
    chapter: null,
    verse: null,
  });

  const snapShotOfBible = useMemo(
    () => Bible.getBibleData,
    [Bible.getBibleData]
  );

  const debouncedInput = debounce((string: string) => {
    const res = fuzz(string.toLowerCase());
    if (res.book == null) scrollHandler(null);
    setSearchResults(res);
  }, 900);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    debouncedInput(term);
    setSearchTerm(term);
  };

  const scrollHandler = (target: HTMLElement | null) => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    if (target == null) {
      container.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Get the top position of the target relative to the document
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate the scroll offset needed to align the target's top to the container's top
    const scrollOffset =
      targetRect.top - containerRect.top + container.scrollTop;

    // Scroll the container to the calculated offset
    container.scrollTo({
      top: scrollOffset,
      behavior: 'smooth', // Smooth scrolling
    });
  };

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
          <BookContainer
            key={index}
            {...book}
            searchResults={searchResults}
            scrollHandler={scrollHandler}
          />
        ))}
      </div>
    </div>
  );
}
