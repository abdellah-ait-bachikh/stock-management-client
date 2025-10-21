#[cfg(windows)]
use std::os::windows::process::CommandExt;
use std::path::PathBuf;
use std::process::Command;
use std::sync::{Arc, Mutex};
use tauri::{Manager, WindowEvent};
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(not(debug_assertions))]
            {
                // Get directory of the .exe
                let exe_dir: PathBuf = std::env::current_exe()
                    .unwrap()
                    .parent()
                    .unwrap()
                    .to_path_buf();

                let node_path = exe_dir.join("node").join("node.exe");
                let server_path = exe_dir
                    .join("stock-management-server")
                    .join("dist")
                    .join("index.js");
                // Start the Node.js server hidden on Windows
                let mut cmd = Command::new(node_path);
                cmd.arg(server_path);

                #[cfg(windows)]
                {
                    cmd.creation_flags(0x08000000);
                }

                let child = cmd.spawn().expect("Failed to start Node.js server");

                let child_arc = Arc::new(Mutex::new(Some(child)));
                let child_clone = Arc::clone(&child_arc);

                // Get the main window (replace "main" with your window label if different)
                let main_window = app.get_webview_window("main").unwrap();

                // Kill the server when window closes
                main_window.on_window_event(move |event| {
                    if let WindowEvent::CloseRequested { .. } = event {
                        if let Ok(mut lock) = child_clone.lock() {
                            if let Some(mut child_proc) = lock.take() {
                                let _ = child_proc.kill();
                            }
                        }
                    }
                });

                println!("Production mode: Node.js server started.");
            }

            #[cfg(debug_assertions)]
            {
                println!("Development mode: not starting internal Node.js server.");
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
