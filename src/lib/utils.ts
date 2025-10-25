import axios from "axios";


export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, withCredentials: true,
});

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