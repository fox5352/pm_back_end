#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .setup(|_app|{
        //     let _secondary_window = tauri::WindowBuilder::new(
        //         _app, "live view",
        //         tauri::WindowUrl::App("/live".into())
        //     ).build()?;
        //
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
