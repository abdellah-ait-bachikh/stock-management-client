use std::io::{BufRead, BufReader};
#[cfg(windows)]
use std::os::windows::process::CommandExt;
use std::process::{Child, Command, Stdio};
use std::sync::{Arc, Mutex};
use tauri::{Manager, WindowEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            // Only run the server in RELEASE mode
            if !cfg!(debug_assertions) {
                // Store child process handle
                let child_process: Arc<Mutex<Option<Child>>> = Arc::new(Mutex::new(None));
                let child_ref = child_process.clone();

                // Get folder where app.exe lives
                let app_dir = std::env::current_exe()
                    .ok()
                    .and_then(|p| p.parent().map(|p| p.to_path_buf()))
                    .expect("Failed to get current exe directory");

                let node_path = app_dir.join("node").join("node.exe");
                let server_script = app_dir
                    .join("stock-management-server")
                    .join("dist")
                    .join("index.js");

                println!("🟢 Starting server (production mode)...");
                println!("Node path: {:?}", node_path);
                println!("Server script: {:?}", server_script);

                // Spawn Node
                let mut command = Command::new(&node_path);
                command.arg(&server_script).current_dir(&app_dir);

                // Detach process (no console, background)
                #[cfg(windows)]
                {
                    command.creation_flags(0x00000008); // DETACHED_PROCESS
                }

                match command.spawn() {
                    Ok(child) => {
                        println!("✅ Server process spawned!");
                        *child_process.lock().unwrap() = Some(child);
                    }
                    Err(e) => {
                        println!("❌ Failed to start server: {:?}", e);
                    }
                }

                app.manage(child_ref);
            }

            Ok(())
        })
        .on_window_event(|window, event| {
            if let WindowEvent::CloseRequested { .. } = event {
                // Kill Node server when app closes
                if let Some(child_ref) =
                    window.app_handle().try_state::<Arc<Mutex<Option<Child>>>>()
                {
                    if let Some(mut child) = child_ref.lock().unwrap().take() {
                        let _ = child.kill();
                        println!("🛑 Node server stopped.");
                    }
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
