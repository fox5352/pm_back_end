pub mod store;

pub mod bible_types {
    use rustpm_orm::database::{gen_id, Id};


    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct Verse {
        pub verse_number: u32,
        pub text: String,
    }

    impl Verse {
        pub fn new(verse_number: u32, text: String) -> Self {
            return Verse { verse_number, text };
        }
    }

    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct Chapter {
        pub chapter_number: u32,
        pub verses: Vec<Verse>,
    }

    impl Chapter {
        pub fn new(chapter_number: u32) -> Self {
            return Chapter {
                chapter_number,
                verses: vec![],
            };
        }
        pub fn add(&mut self, data: Vec<Verse>) {
            self.verses.extend(data);
        }
    }

    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct Book {
        pub book_name: String,
        pub book: u32,
        pub chapters: Vec<Chapter>,
    }

    impl Book {
        pub fn new(book: u32, book_name: String) -> Self {
            return Book {
                book,
                book_name,
                chapters: vec![],
            };
        }
    }

    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct MetaData {
        pub name: String,
        pub description: String,
        pub shortname: String,
        pub module: String,
        pub module_version: String,
        pub year: String,
    }

    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct Bible {
        pub id: String,
        pub meta_data: MetaData,
        pub book: Book,
    }

    impl Id for Bible {
        fn gen_id(&self) -> String {
            return gen_id();
        }
    }


    #[derive(serde::Serialize,serde::Deserialize)]
    pub struct TableIndex {
        pub short_name: String,
        pub id: String,
    }

    impl Id for TableIndex {
        fn gen_id(&self) -> String {
            gen_id()
        }
    }

}