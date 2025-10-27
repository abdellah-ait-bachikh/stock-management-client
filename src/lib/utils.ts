import axios from "axios";
import { loadToken } from "./tauriStore";


export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, withCredentials: true,  headers: {
    'Content-Type': 'application/json',
  },
});
request.interceptors.request.use(
  async (config) => {
    // Try to get token from store first
    const token = await loadToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log('Authentication failed, clearing token...');
      // You can dispatch a logout action here if needed
      delete request.defaults.headers.common['Authorization'];
    }
    return Promise.reject(error);
  }
);
export const checkIfIsValid = <T extends object>(
  errors: T | null | undefined,
  field: keyof T | string
): boolean => {
  if (!errors) return false;
  const value = (errors as Record<string, unknown>)[field as string];
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => typeof v === "string")
  );
};
export const hasErrors = <T extends object>(
  errors: T | null | undefined
): boolean => {
  if (!errors) return false; // no errors object = no errors

  const values = Object.values(errors as Record<string, unknown>);

  // Return true if any field has an error (non-empty array of strings)
  return values.some(
    (v) =>
      Array.isArray(v) &&
      v.length > 0 &&
      v.every((msg) => typeof msg === "string")
  );
};

export function replaceEmptyStringsWithUndefined<T extends Record<string, any>>(
  obj: T
): { [K in keyof T]: T[K] | undefined } {
  const result = {} as { [K in keyof T]: T[K] | undefined };

  for (const key in obj) {
    result[key] = obj[key] === "" ? undefined : obj[key];
  }

  return result;
}

export const isAdmin =(role: string)=>role==="admin"

export const formatCount = (count: number): string => {
  if (count < 1000) return count.toString(); // 0–999

  if (count < 1_000_000) {
    // 1,000–999,999 → "1.2K"
    return (count / 1000).toFixed(count % 1000 < 100 ? 1 : 0) + " K";
  }

  if (count < 1_000_000_000) {
    // 1,000,000–999,999,999 → "1.2M"
    return (count / 1_000_000).toFixed(count % 1_000_000 < 100_000 ? 1 : 0) + " M";
  }

  // ≥ 1 billion → "1.2B"
  return (count / 1_000_000_000).toFixed(count % 1_000_000_000 < 100_000_000 ? 1 : 0) + " B";
};
export const formatNumber = (count: number): string => {
  return count.toLocaleString("en-US");
};
