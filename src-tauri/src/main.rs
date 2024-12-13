#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use pm_manager::{
    bible_types::Bible,
    store::{
        display::DisplayHook,
        playlist::{PlayListHook, Slide},
    },
};

use std::{io::{Error, ErrorKind}, sync::MutexGuard};

use rustpm_orm::database::DBManager;

use std::sync::{Mutex, OnceLock};

static DISPLAY_HOOK: OnceLock<Mutex<DisplayHook>> = OnceLock::new();
static PLAYLIST_HOOK: OnceLock<Mutex<PlayListHook>> = OnceLock::new();
static BIBLE_DB_HOOK: OnceLock<Mutex<DBManager>> = OnceLock::new();
static TABLE_DB_HOOK: OnceLock<Mutex<DBManager>> = OnceLock::new();

#[derive(serde::Serialize, serde::Deserialize)]
struct Package<T> {
    data: Option<T>,
    message: String,
    error: bool,
}

/// A helper function to safely lock and access a `Mutex` wrapped in a `OnceLock`.
///
/// This function attempts to acquire a lock on the provided `OnceLock<Mutex<T>>`.
/// If successful, it returns a `MutexGuard` allowing access to the inner `T`.
/// If the `OnceLock` is not initialized or the lock cannot be acquired, it returns an `Error`.
///
/// # Parameters
///
/// * `hook`: A reference to the `OnceLock<Mutex<T>>` to be locked.
///
/// # Returns
///
/// * `Result<MutexGuard<'a, T>, Error>`: On success, returns a `MutexGuard` allowing access to the inner `T`.
///   On failure, returns an `Error` indicating the reason for the failure.
fn lock_helper<'a, T>(hook: &'a OnceLock<Mutex<T>>) -> Result<MutexGuard<'a, T>, Error> {
    if let Some(hook) = hook.get() {
        return match hook.lock() {
            Err(_err) => Err(Error::new(ErrorKind::Other, "failed to lock hook")),
            Ok(hook) => Ok(hook)
        }
    } else {
        return Err(Error::new(ErrorKind::NotFound, "failed to get hook"));
    }
}


// ------------------------------------------ display hook ------------------------------------------
#[tauri::command]
fn get_is_live() -> Package<bool> {
    return match lock_helper(&DISPLAY_HOOK) {
        Ok(data) => Package {
                data: Some(data.is_live),
                message: String::from("Display hook is live"),
                error: false,
            },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        }    
    }
}

/// Toggles the "is live" state of the display hook.
///
/// # Returns
/// A `Package` indicating success or failure.
#[tauri::command]
fn toggle_is_live() -> Package<()> {
    return match lock_helper(&DISPLAY_HOOK) {  
        Ok(mut data) => {
            data.toggle();
            Package {
                data: Some(()),
                message: String::from("Toggled 'is live' state successfully"),
                error: false,
            }
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        }    
    }
}

/// Sets the index in the playlist.
///
/// # Parameters
/// - `idx`: The index to set, or `None` to clear it.
///
/// # Returns
/// A `Package` indicating success or failure.
#[tauri::command]
fn set_index(idx: Option<i32>) -> Package<()> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(mut data) => {
            data.set_index(idx);
            Package {
                data: Some(()),
                message: String::from("Index set successfully"),
                error: false,
            }
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        }    
    }
}

/// Sets the background of the playlist.
///
/// # Parameters
/// - `bg`: The background to set, or `None` to clear it.
///
/// # Returns
/// A `Package` indicating success or failure.
#[tauri::command]
fn set_bg(bg: Option<String>) -> Package<()> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(mut data) => {
            data.set_bg(bg);
            Package {
                data: Some(()),
                message: String::from("Background set successfully"),
                error: false,
            }
        },
            Err(err) => Package {
                data: None,
                message: err.to_string(),
                error: true,
            }    
    }
}

/// Adds a slide to the playlist.
///
/// # Parameters
/// - `slide`: The slide to add.
///
/// # Returns
/// A `Package` indicating success or failure.
#[tauri::command]
fn add_slide(slide: Slide) -> Package<()> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(mut data) => {
            data.add_slide(slide);
            Package {
                data: Some(()),
                message: String::from("Slide added successfully"),
                error: false,
            }
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        }    
    }
}

/// Removes a slide from the playlist by ID.
///
/// # Parameters
/// - `id`: The ID of the slide to remove.
///
/// # Returns
/// A `Package` indicating success or failure.
#[tauri::command]
fn remove_slide(id: String) -> Package<()> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(mut data) => {
            data.remove_slide(id);
            Package {
                data: Some(()),
                message: String::from("Slide removed successfully"),
                error: false,
            }
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        }    
    }
}

/// Updates a slide in the playlist.
///
/// # Parameters
/// - `slide`: The slide to update.
///
/// # Returns
/// A `Package` indicating success or failure.
#[tauri::command]
fn update_slide(slide: Slide) -> Package<()> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(mut data) => {
            data.update_slide(slide);
            Package {
                data: Some(()),
                message: String::from("Slide updated successfully"),
                error: false,
            }
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        }    
    }
}

/// Retrieves the list of slides in the playlist.
///
/// # Returns
/// A `Package` containing the list of slides or an error message.
#[tauri::command]
fn get_list() -> Package<Vec<Slide>> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(data) => Package {
            data: Some(data.list.clone()),
            message: String::from("List retrieved successfully"),
            error: false,
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        }    
    }
}

#[tauri::command]
fn get_list_item(index: usize) -> Package<Slide> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(hook)=> {
            if let Some(slide) = hook.list.get(index) {
                Package {
                    data: Option::Some(slide.clone()),
                    message: format!(""),
                    error: false,
                }
            }else {
                Package {
                    data: None,
                    message: format!("faild to get item with index provided: {}", index),
                    error: true,
                }
            }
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        }    
    }
}

/// Retrieves the background of the playlist.
///
/// # Returns
/// A `Package` containing the background or an error message.
#[tauri::command]
fn get_bg() -> Package<Option<String>> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(data) => Package {
            data: Some(data.bg.clone()),
            message: String::from("Background retrieved successfully"),
            error: false,
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        },
    }
}

/// Retrieves the current index in the playlist.
///
/// # Returns
/// A `Package` containing the index or an error message.
#[tauri::command]
fn get_index() -> Package<Option<i32>> {
    return match lock_helper(&PLAYLIST_HOOK) {
        Ok(data) => Package {
            data: Some(data.index),
            message: String::from("Index retrieved successfully"),
            error: false,
        },
        Err(err) => Package {
            data: None,
            message: err.to_string(),
            error: true,
        },
    }
    
}

/// Gets Bible from front end and stores them into the database
///
/// #Returns
/// A `bool` to indicate oparations state
#[tauri::command]
fn save_bible(bible: Bible) -> Package<bool> {
    // if let Some(hook) = BIBLE_DB_HOOK.get() {
    //     if let Ok(db) = hook.lock() {
    //         let bible_version = bible.meta_data.shortname.clone();

    //         if let Ok(id) = db.insert_data(bible) {}
    //     } else {
    //         return Package {
    //             data: None,
    //             message: format!("Failed to lock bible db hook"),
    //             error: true,
    //         };
    //     }
    // } else {
    return Package {
        data: Option::None,
        message: String::from("bible db hook not initialized"),
        error: true,
    };
}

fn main() {
    DISPLAY_HOOK
        .set(Mutex::new(DisplayHook::new()))
        .expect("failed to initialize display hook");
    PLAYLIST_HOOK
        .set(Mutex::new(PlayListHook::new()))
        .expect("failed to initialize playlist hook");
    let db = DBManager::new(String::from("bible_db")).expect("Failed to connect to database");
    BIBLE_DB_HOOK
        .set(Mutex::new(db))
        .expect("failed to initialize playlist hook");

    tauri::Builder::default()
        .setup(|app| {
            let _preview_window = tauri::WindowBuilder::new(
                app,
                "live-view", // Changed from "live view" to "live-view"
                tauri::WindowUrl::App("/live".into()),
            )
            .build()?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // display hooks
            // funcs
            toggle_is_live,
            // getters
            get_is_live,
            // playlist hooks
            // setters
            set_index,
            set_bg,
            add_slide,
            remove_slide,
            update_slide,
            // getters
            get_list,
            get_list_item,
            get_bg,
            get_index
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
