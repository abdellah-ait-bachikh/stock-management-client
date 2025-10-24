// Create a types.d.ts file in your src folder
declare interface Window {
  __TAURI__?: any;
}

// Then use:
const isTauri = window.__TAURI__ !== undefined;