// globale states
export interface AppInitialStateType {
  isAsideOpen: boolean;
  theme: "light" | "dark";
}
export interface AuthInitialStateType {
  user: null | {
    id:string,
    userName:string 
    role:string,
    email:string
  }
   userId:  null | string,
}

// validation errors type
export interface ValidationRegisterUserErrorsType {
  userName: null | string[];
  password: null | string[];
  confirmePassword: null | string[];
  email: null | string[];
}
export interface ValidationLogInUserErrorsType {
  userName: null | string[];
  password: null | string[];
}

// form types
export interface RegisterUserType {
  userName: string;
  password: string;
  confirmePassword: string;
  email: string;
}
export interface LogInUserType {
  userName: string;
    password: string;

}

//form Fields types
export type RegisterUserFieldsType = keyof RegisterUserType;
export type LogInUserFieldsType = keyof LogInUserType;
