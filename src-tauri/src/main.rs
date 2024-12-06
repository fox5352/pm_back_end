#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use pm_manager::store::{
    display::DisplayHook,
    playlist::{PlayListHook, Slide},
};

use std::sync::{Mutex, OnceLock};

static DISPLAY_HOOK: OnceLock<Mutex<DisplayHook>> = OnceLock::new();
static PLAYLIST_HOOK: OnceLock<Mutex<PlayListHook>> = OnceLock::new();

#[derive(serde::Serialize, serde::Deserialize)]
struct Package<T> {
    data: Option<T>,
    message: String,
    error: bool,
}

// ------------------------------------------ display hook ------------------------------------------
#[tauri::command]
fn get_is_live() -> Package<bool> {
    if let Some(hook) = DISPLAY_HOOK.get() {
        match hook.lock() {
            Ok(data) => Package {
                data: Some(data.is_live),
                message: String::from("Display hook is live"),
                error: false,
            },
            Err(err) => Package {
                data: None,
                message: format!("Error while locking display hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Failed to get display hook"),
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
    if let Some(hook) = DISPLAY_HOOK.get() {
        match hook.lock() {
            Ok(mut data) => {
                data.toggle();
                Package {
                    data: Some(()),
                    message: String::from("Toggled 'is live' state successfully"),
                    error: false,
                }
            }
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock display hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Display hook not initialized"),
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
    if let Some(hook) = PLAYLIST_HOOK.get() {
        match hook.lock() {
            Ok(mut data) => {
                data.set_index(idx);
                Package {
                    data: Some(()),
                    message: String::from("Index set successfully"),
                    error: false,
                }
            }
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock playlist hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
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
    if let Some(hook) = PLAYLIST_HOOK.get() {
        match hook.lock() {
            Ok(mut data) => {
                data.set_bg(bg);
                Package {
                    data: Some(()),
                    message: String::from("Background set successfully"),
                    error: false,
                }
            }
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock playlist hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
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
    if let Some(hook) = PLAYLIST_HOOK.get() {
        match hook.lock() {
            Ok(mut data) => {
                data.add_slide(slide);
                Package {
                    data: Some(()),
                    message: String::from("Slide added successfully"),
                    error: false,
                }
            }
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock playlist hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
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
    if let Some(hook) = PLAYLIST_HOOK.get() {
        match hook.lock() {
            Ok(mut data) => {
                data.remove_slide(id);
                Package {
                    data: Some(()),
                    message: String::from("Slide removed successfully"),
                    error: false,
                }
            }
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock playlist hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
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
    if let Some(hook) = PLAYLIST_HOOK.get() {
        match hook.lock() {
            Ok(mut data) => {
                data.update_slide(slide);
                Package {
                    data: Some(()),
                    message: String::from("Slide updated successfully"),
                    error: false,
                }
            }
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock playlist hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
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
    if let Some(hook) = PLAYLIST_HOOK.get() {
        match hook.lock() {
            Ok(data) => Package {
                data: Some(data.list.clone()),
                message: String::from("List retrieved successfully"),
                error: false,
            },
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock playlist hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
            error: true,
        }
    }
}

#[tauri::command]
fn get_list_item(index: usize) -> Package<Slide> {
    if let Some(hook) = PLAYLIST_HOOK.get() {
        if let Ok(hook) = hook.lock() {
            return match hook.list.get(index) {
                Some(data) => Package {
                    data: Option::Some(data.clone()),
                    message: format!(""),
                    error: false,
                },
                None => Package {
                    data: None,
                    message: format!("faild to get item with index provided: {}", index),
                    error: true,
                },
            };
        } else {
            return Package {
                data: None,
                message: format!("Failed to lock playlist hook"),
                error: true,
            };
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
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
    if let Some(hook) = PLAYLIST_HOOK.get() {
        match hook.lock() {
            Ok(data) => Package {
                data: Some(data.bg.clone()),
                message: String::from("Background retrieved successfully"),
                error: false,
            },
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock playlist hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
            error: true,
        }
    }
}

/// Retrieves the current index in the playlist.
///
/// # Returns
/// A `Package` containing the index or an error message.
#[tauri::command]
fn get_index() -> Package<Option<i32>> {
    if let Some(hook) = PLAYLIST_HOOK.get() {
        match hook.lock() {
            Ok(data) => Package {
                data: Some(data.index),
                message: String::from("Index retrieved successfully"),
                error: false,
            },
            Err(err) => Package {
                data: None,
                message: format!("Failed to lock playlist hook: {}", err),
                error: true,
            },
        }
    } else {
        Package {
            data: None,
            message: String::from("Playlist hook not initialized"),
            error: true,
        }
    }
}

fn main() {
    DISPLAY_HOOK.set(Mutex::new(DisplayHook::new())).unwrap();
    PLAYLIST_HOOK.set(Mutex::new(PlayListHook::new())).unwrap();

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
