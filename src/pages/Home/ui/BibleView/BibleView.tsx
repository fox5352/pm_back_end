import { ChangeEvent, useMemo, useState } from 'react';
import { Bible } from '../../../../api/requests';

import { debounce } from '../../../../lib/tools';

import styles from './bibleview.module.css';
import BookContainer from './BookContainer';

export default function BibleView() {
  const [searchTerm, setSearchTerm] = useState('');

  const snapShotOfBible = useMemo(
    () => Bible.getBibleData,
    [Bible.getBibleData]
  );

  const handleInput = debounce((event: ChangeEvent<HTMLInputElement>) => {
    let string = event.target.value;

    console.log(string)

    setSearchTerm(string)
  })

  return (
    <div className={styles.body}>
      <div className={styles.input_container}>
        <input className={styles.input} type="text" value={searchTerm} onChange={handleInput} />
      </div>
      <div className={styles.bible_view_content}>
        {snapShotOfBible.map((book, index) => (
          <BookContainer key={index} {...book} />
        ))}
      </div>
    </div>
  );
}
