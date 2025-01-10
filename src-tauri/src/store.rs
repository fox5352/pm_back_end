pub mod display {
    #[derive(Debug, serde::Deserialize, serde::Serialize)]
    pub struct DisplayHook {
        pub is_live: bool,
    }

    impl DisplayHook {
        pub fn new() -> Self {
            return DisplayHook { is_live: false };
        }
        pub fn toggle(&mut self) {
            self.is_live = !self.is_live;
        }
    }
}

pub mod playlist {
    #[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
    pub struct Content {
        pub tag: String,
        pub content: String,
    }

    #[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
    pub struct Slide {
        pub id: String,
        pub text: Vec<Content>,
        pub bg: Option<String>,
    }

    #[derive(Debug)]
    pub struct PlayListHook {
        pub list: Vec<Slide>,
        pub bg: Option<String>,
        pub index: Option<i32>,
    }

    impl PlayListHook {
        pub fn new() -> Self {
            return PlayListHook {
                list: vec![],
                bg: None,
                index: None,
            };
        }
        pub fn set_index(&mut self, idx: Option<i32>) {
            self.index = idx;
        }
        pub fn set_bg(&mut self, bg: Option<String>) {
            self.bg = bg;
        }
        pub fn add_slide(&mut self, slide: Slide) {
            self.list.push(slide);
        }
        pub fn remove_slide(&mut self, id: String) {
            self.list.retain(|x| x.id != id);
        }
        pub fn update_slide(&mut self, data: Slide) {
            let buffer: Vec<Slide> = self
                .list
                .clone()
                .iter()
                .map(|slide| {
                    return match slide.id.cmp(&data.id) {
                        std::cmp::Ordering::Equal => data.clone(),
                        _ => slide.clone(),
                    };
                })
                .collect();

            self.list = buffer;
        }
    }
}

#[cfg(test)]
mod test_display {
    use crate::store::display::DisplayHook;

    #[test]
    fn create_display_hook() {
        let hook = DisplayHook::new();

        assert_eq!(hook.is_live, false);
    }

    #[test]
    fn toggle_display_hook() {
        let mut hook = DisplayHook::new();

        assert_eq!(hook.is_live, false);

        hook.toggle();

        assert_eq!(hook.is_live, true);

        hook.toggle();

        assert_eq!(hook.is_live, false);
    }
}

#[cfg(test)]
mod test_playlist {
    use crate::store::playlist::{Content, PlayListHook, Slide};

    #[test]
    fn create_playlist_hook() {
        let hook = PlayListHook::new();

        assert_eq!(hook.bg, Option::None);
        assert_eq!(hook.index, Option::None);
        assert_eq!(hook.list.len(), 0);
    }

    #[test]
    fn set_index_playlist_hook() {
        let mut hook = PlayListHook::new();

        assert_eq!(hook.index, Option::None);

        hook.set_index(Option::Some(0));

        assert_eq!(hook.index, Option::Some(0));

        hook.set_index(Option::Some(2000));

        assert_eq!(hook.index, Option::Some(2000))
    }

    #[test]
    fn set_bg_playlist_hook() {
        let mut hook = PlayListHook::new();

        assert_eq!(hook.bg, Option::None);

        hook.set_bg(Option::Some("testing".to_string()));

        assert_eq!(hook.bg, Option::Some("testing".to_string()))
    }

    #[test]
    fn add_slide_playlist_hook() {
        let text: Vec<Content> = vec![];

        let slide: Slide = Slide {
            id: "string".to_string(),
            bg: Option::None,
            text,
        };

        let mut hook = PlayListHook::new();

        assert_eq!(hook.list.len(), 0);

        hook.add_slide(slide);

        assert_eq!(hook.list.len(), 1);
    }

    #[test]
    fn remove_slide_playlist_hook() {
        let text: Vec<Content> = vec![];

        let slide: Slide = Slide {
            id: "string".to_string(),
            bg: Option::None,
            text: text.clone(),
        };

        let slidetwo: Slide = Slide {
            id: "two".to_string(),
            bg: Option::None,
            text,
        };

        let mut hook = PlayListHook::new();

        assert_eq!(hook.list.len(), 0);

        hook.add_slide(slide.clone());
        hook.add_slide(slidetwo);

        assert_eq!(hook.list.len(), 2);

        hook.remove_slide(slide.id);

        assert_eq!(hook.list.len(), 1);
    }

    #[test]
    fn update_slide_playlist_hook() {
        let text: Vec<Content> = vec![];

        let slide: Slide = Slide {
            id: "string".to_string(),
            bg: None,
            text: text.clone(),
        };

        let slidetwo: Slide = Slide {
            id: "two".to_string(),
            bg: None,
            text,
        };

        let mut hook = PlayListHook::new();

        // Assert that the playlist is initially empty
        assert_eq!(hook.list.len(), 0);

        // Add two slides to the playlist
        hook.add_slide(slide.clone());
        hook.add_slide(slidetwo.clone());

        // Assert that the playlist now has 2 slides
        assert_eq!(hook.list.len(), 2);

        // Update the second slide with a new background
        hook.update_slide(Slide {
            id: slidetwo.id.clone(),
            text: vec![],
            bg: Some("test".to_string()),
        });

        // Find the updated slide in the playlist
        let updated_slide = hook
            .list
            .iter()
            .find(|x| x.id == slidetwo.id)
            .expect("Slide with the given ID should exist");

        // Assert that the updated slide has the new background
        assert_eq!(updated_slide.bg, Some("test".to_string()));
    }
}
