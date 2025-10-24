// src/lib/universalStore.ts
import { load } from '@tauri-apps/plugin-store';

let isTauri: boolean;
try {
  // Tauri sets this global object
  isTauri = !!(window as any).__TAURI__;
} catch {
  isTauri = false;
}

// Lazy-load Tauri store
let storePromise: ReturnType<typeof load> | null = null;
const getStore = async () => {
  if (!storePromise) {
    storePromise = load('store.json', { defaults: {}, autoSave: true });
  }
  return storePromise;
};

export type StoredUser = {
  id: string;
  userName: string;
  role: string;
  email: string;
};

// Save user
export const saveUser = async (user: StoredUser) => {
  if (isTauri) {
    const store = await getStore();
    await store.set('user', user);
    await store.save();
  } else {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};

// Load user
export const loadUser = async (): Promise<StoredUser | null> => {
  if (isTauri) {
    const store = await getStore();
    const user = await store.get<StoredUser>('user');
    return user ?? null;
  } else {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
};

// Remove user
export const removeUser = async () => {
  if (isTauri) {
    const store = await getStore();
    await store.delete('user');
    await store.save();
  } else {
    localStorage.removeItem('currentUser');
  }
};
