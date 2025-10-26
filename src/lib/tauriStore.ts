import { load } from "@tauri-apps/plugin-store";

let isTauri = false;
try {
  isTauri = !!(window as any).__TAURI__;
} catch {
  isTauri = false;
}

let storePromise: ReturnType<typeof load> | null = null;
const getStore = async () => {
  if (!storePromise)
    storePromise = load("store.json", { defaults: {}, autoSave: true });
  return storePromise;
};

export type AuthData = {
  userId: string | null;
  token: string | null;
};

// Save both user ID and token in one object
export const saveAuthData = async (authData: AuthData) => {
  if (isTauri) {
    const store = await getStore();
    await store.set("authData", authData);
    await store.save();
  } else {
    localStorage.setItem("authData", JSON.stringify(authData));
  }
};

// Load both user ID and token from storage
export const loadAuthData = async (): Promise<AuthData> => {
  if (isTauri) {
    const store = await getStore();
    return (await store.get<AuthData>("authData")) ?? { userId: null, token: null };
  } else {
    const authData = localStorage.getItem("authData");
    return authData ? JSON.parse(authData) : { userId: null, token: null };
  }
};

// Remove both user ID and token from storage
export const removeAuthData = async () => {
  if (isTauri) {
    const store = await getStore();
    await store.delete("authData");
    await store.save();
  } else {
    localStorage.removeItem("authData");
  }
};

// Individual getters for convenience
export const loadUserId = async (): Promise<string | null> => {
  const authData = await loadAuthData();
  return authData.userId;
};

export const loadToken = async (): Promise<string | null> => {
  const authData = await loadAuthData();
  return authData.token;
};

// Individual setters for convenience
export const saveUser = async (userId: string | null) => {
  const currentAuthData = await loadAuthData();
  await saveAuthData({
    ...currentAuthData,
    userId
  });
};

export const saveToken = async (token: string | null) => {
  const currentAuthData = await loadAuthData();
  await saveAuthData({
    ...currentAuthData,
    token
  });
};

// Update both at once
export const updateAuthData = async (updates: Partial<AuthData>) => {
  const currentAuthData = await loadAuthData();
  await saveAuthData({
    ...currentAuthData,
    ...updates
  });
};