import { useMemo } from 'react';
import { Bible } from '../../../../api/requests';

import styles from './bibleview.module.css';
import BookContainer from './BookContainer';

export default function BibleView() {
  const snapShotOfBible = useMemo(
    () => Bible.getBibleData,
    [Bible.getBibleData]
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
