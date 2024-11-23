import asvJson from '../assets/asv.json';

const asv = asvJson as unknown as AsvJson;

export type Verse = {
  [verseNumber: string]: string | undefined;
};

export type Chapter = {
  [chapterNumber: string]: Verse;
};

export type Book = {
  book_name: string;
  book: number;
  chapters: Chapter;
};

export type MetaData = {
  name: string;
  description: string;
  shortname: string;
  module: string;
  module_version: string;
  year: string;
};

interface AsvJson {
  metadata?: MetaData;
  verses?: Book[]; // Verses are cleaned at runtime
}

export type BibleMap = {
  [book_name: string]: number;
};

function createMeta(): MetaData {
  const { metadata } = asv;

  if (!metadata)
    throw new Error('failed to get meta data from bible json file');

  return metadata as MetaData;
}

function getBibleData(): Book[] {
  const { verses } = asv;

  if (!verses) throw new Error('failed to get bible data from bible json file');

  return verses as Book[];
}

class BibleData {
  public metaData: MetaData;
  private data: Book[];
  public bibleMap: BibleMap;

  constructor() {
    this.data = getBibleData();
    this.metaData = createMeta();
    this.bibleMap = this.buildMap();
  }

  private buildMap(): BibleMap {
    let buffer: BibleMap = {};

    this.data.forEach((book) => {
      buffer[book.book_name.toLowerCase()] = book.book - 1;
    });

    return buffer;
  }

  get getBibleData(): Book[] {
    return this.data;
  }

  get getMetaData(): MetaData {
    return this.metaData;
  }

  getBook(book_name: string): Book {
    const index = this.bibleMap[book_name];
    if (index === undefined)
      throw new Error(`Book "${book_name}" not found in Bible`);
    return this.data[index];
  }

  getChapter(book_name: string, chapter: string) {
    const book = this.getBook(book_name);
    if (!book.chapters[chapter]) {
      throw new Error(`Chapter "${chapter}" not found in book "${book_name}"`);
    }
    return book.chapters[chapter];
  }
}

export const Bible = new BibleData();
