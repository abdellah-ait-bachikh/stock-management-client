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

export type StoredUserId = string | null;

export const saveUser = async (userId: StoredUserId) => {
  if (isTauri) {
    const store = await getStore();
    await store.set("userId", userId);
    await store.save();
  } else {
    localStorage.setItem("userId", JSON.stringify(userId));
  }
};

export const loadUserId = async (): Promise<StoredUserId | null> => {
  if (isTauri) {
    const store = await getStore();
    return (await store.get<StoredUserId>("userId")) ?? null;
  } else {
    const id = localStorage.getItem("userId");
    return id ? JSON.parse(id) : null;
  }
};

export const removeUser = async () => {
  if (isTauri) {
    const store = await getStore();
    await store.delete("userId");
    await store.save();
  } else {
    localStorage.removeItem("userId");
  }
};
