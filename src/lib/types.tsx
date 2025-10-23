// globale states
export interface AppInitialStateType {
  isAsideOpen: boolean;
  theme: "light" | "dark";
}
export interface AuthInitialStateType {

}

// validation errors type
export interface ValidationRegisterUserErrorsType {
  userName: null | string[];
  password: null | string[];
  confirmePassword: null | string[];
  email: null | string[];
}

// form types
export interface RegisterUserType {
  userName: string;
  password: string;
  confirmePassword: string;
  email: string;
}

//form Fields types
export type RegisterUserFieldsType = keyof RegisterUserType;
