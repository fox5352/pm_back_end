type BibleBookName =
  | "Genesis" | "Exodus" | "Leviticus" | "Numbers" | "Deuteronomy"
  | "Joshua" | "Judges" | "Ruth" | "1 Samuel" | "2 Samuel"
  | "1 Kings" | "2 Kings" | "1 Chronicles" | "2 Chronicles" | "Ezra"
  | "Nehemiah" | "Esther" | "Job" | "Psalms" | "Proverbs"
  | "Ecclesiastes" | "Song of Solomon" | "Isaiah" | "Jeremiah" | "Lamentations"
  | "Ezekiel" | "Daniel" | "Hosea" | "Joel" | "Amos"
  | "Obadiah" | "Jonah" | "Micah" | "Nahum" | "Habakkuk"
  | "Zephaniah" | "Haggai" | "Zechariah" | "Malachi"
  | "Matthew" | "Mark" | "Luke" | "John" | "Acts"
  | "Romans" | "1 Corinthians" | "2 Corinthians" | "Galatians" | "Ephesians"
  | "Philippians" | "Colossians" | "1 Thessalonians" | "2 Thessalonians" | "1 Timothy"
  | "2 Timothy" | "Titus" | "Philemon" | "Hebrews" | "James"
  | "1 Peter" | "2 Peter" | "1 John" | "2 John" | "3 John"
  | "Jude" | "Revelation";
//
// type ShortBibleKey =
//   | "gen" | "exo" | "lev" | "num" | "deu"
//   | "jos" | "jdg" | "rut" | "1sa" | "2sa"
//   | "1ki" | "2ki" | "1ch" | "2ch" | "ezr"
//   | "neh" | "est" | "job" | "psa" | "pro"
//   | "ecc" | "sos" | "isa" | "jer" | "lam"
//   | "eze" | "dan" | "hos" | "joe" | "amo"
//   | "oba" | "jon" | "mic" | "nah" | "hab"
//   | "zep" | "hag" | "zec" | "mal"
//   | "mat" | "mar" | "luk" | "joh" | "act"
//   | "rom" | "1co" | "2co" | "gal" | "eph"
//   | "phi" | "col" | "1th" | "2th" | "1ti"
//   | "2ti" | "tit" | "phm" | "heb" | "jam"
//   | "1pe" | "2pe" | "1jo" | "2jo" | "3jo"
//   | "jud" | "rev";


interface KeyStructure {
  bible_names: BibleBookName[];
  keys: Record<string, number>;
  short_keys: Record<string, number>;
}

const KEY: KeyStructure = Object.freeze({
  bible_names: [
    // Old Testament
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua',
    'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
    '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job',
    'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
    'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
    'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
    'Haggai', 'Zechariah', 'Malachi',

    // New Testament
    'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
    '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians',
    '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
    'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John',
    '3 John', 'Jude', 'Revelation',
  ] as BibleBookName[],
  keys: {
    "genesis": 0, "exodus": 1, "leviticus": 2, "numbers": 3, "deuteronomy": 4,
    "joshua": 5, "judges": 6, "ruth": 7, "1 samuel": 8, "2 samuel": 9,
    "1 kings": 10, "2 kings": 11, "1 chronicles": 12, "2 chronicles": 13, "ezra": 14,
    "nehemiah": 15, "esther": 16, "job": 17, "psalms": 18, "proverbs": 19,
    "ecclesiastes": 20, "song of solomon": 21, "isaiah": 22, "jeremiah": 23, "lamentations": 24,
    "ezekiel": 25, "daniel": 26, "hosea": 27, "joel": 28, "amos": 29,
    "obadiah": 30, "jonah": 31, "micah": 32, "nahum": 33, "habakkuk": 34,
    "zephaniah": 35, "haggai": 36, "zechariah": 37, "malachi": 38,
    "matthew": 39, "mark": 40, "luke": 41, "john": 42, "acts": 43,
    "romans": 44, "1 corinthians": 45, "2 corinthians": 46, "galatians": 47, "ephesians": 48,
    "philippians": 49, "colossians": 50, "1 thessalonians": 51, "2 thessalonians": 52, "1 timothy": 53,
    "2 timothy": 54, "titus": 55, "philemon": 56, "hebrews": 57, "james": 58,
    "1 peter": 59, "2 peter": 60, "1 john": 61, "2 john": 62, "3 john": 63,
    "jude": 64, "revelation": 65
  },
  short_keys: {
    "gen": 0, "exo": 1, "lev": 2, "num": 3, "deu": 4,
    "jos": 5, "jdg": 6, "rut": 7, "1sa": 8, "2sa": 9,
    "1ki": 10, "2ki": 11, "1ch": 12, "2ch": 13, "ezr": 14,
    "neh": 15, "est": 16, "job": 17, "psa": 18, "pro": 19,
    "ecc": 20, "sos": 21, "isa": 22, "jer": 23, "lam": 24,
    "eze": 25, "dan": 26, "hos": 27, "joe": 28, "amo": 29,
    "oba": 30, "jon": 31, "mic": 32, "nah": 33, "hab": 34,
    "zep": 35, "hag": 36, "zec": 37, "mal": 38,
    "mat": 39, "mar": 40, "luk": 41, "joh": 42, "act": 43,
    "rom": 44, "1co": 45, "2co": 46, "gal": 47, "eph": 48,
    "phi": 49, "col": 50, "1th": 51, "2th": 52, "1ti": 53,
    "2ti": 54, "tit": 55, "phm": 56, "heb": 57, "jam": 58,
    "1pe": 59, "2pe": 60, "1jo": 61, "2jo": 62, "3jo": 63,
    "jud": 64, "rev": 65
  }
});

// just book name top level <book_name>
// book and chapter format <book_name>:chapter <chapter_num>

export type SearchResult = {
  book: string | null
  chapter: string | null
  verse: string | null
}

export function fuzz(searchTerm: string): SearchResult {

  let idBuffer = {
    book: null,
    chapter: null,
    verse: null,
  } as SearchResult;

  const [book_name, chapter_number, verse_number] = searchTerm.split(' ');

  const is_short_key: number | undefined = KEY.short_keys[book_name];
  const is_long_key = KEY.keys[book_name];

  if (is_short_key != undefined) {
    const book_name = KEY.bible_names[is_short_key];

    idBuffer.book = `${book_name}`;
  } else if (is_long_key != undefined) {
    const book_name = KEY.bible_names[is_long_key];

    idBuffer.book = `${book_name}`;
  }

  // check for chapter
  if (chapter_number) {
    const chapter_num = parseInt(chapter_number, 10);

    if (!Number.isNaN(chapter_num)) {
      idBuffer.chapter = `${idBuffer.book}:chapter ${chapter_num}`

      if (verse_number) {
        const verse_num = parseInt(verse_number, 10);

        if (!Number.isNaN(verse_num)) {
          idBuffer.verse = `${idBuffer.book}:chapter ${chapter_num}:${verse_num}`
        }
      }
    }
  }

  return idBuffer;
}
