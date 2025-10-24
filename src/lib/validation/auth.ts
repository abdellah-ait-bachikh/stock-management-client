import type { LogInUserType, RegisterUserType } from "../types";
import z from "zod";
export const validateRegisterUser = ({
  userName,
  password,
  email,
  confirmePassword,
}: RegisterUserType) => {
  const userSchema = z
    .object({
      userName: z
        .string({ message: "User name must be a string" })
        .trim()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(100, { message: "Username must be less than 50 characters long." })
        .regex(/^[a-zA-Z0-9_\s\u0600-\u06FF\u00C0-\u017F]*$/, {
          message:
            "Username can only contain alphanumeric characters and underscores.",
        })
        .nonempty({ message: "User name is required" }),
      password: z
        .string({ message: "Password must be a string." })
        .min(8, { message: "Password must be at least 8 characters long." })
        .nonempty({ message: "Password is required" }),
      confirmePassword: z
        .string({ message: "Confirm password must be a string." })
        .nonempty({ message: "Confirm password is required" }),
      email: z
        .string({ message: "Email must be a string." })
        .trim()
        .email({ message: "Email must be a valide email." })
        .nullable()
        .default(null),
    })
    .refine((data) => data.password === data.confirmePassword, {
      message: "Passwords do not match.",
      path: ["confirmePassword"],
    });

  const result = userSchema.safeParse({
    userName,
    password,
    email,
    confirmePassword,
  });
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        userName: errors.userName || null,
        password: errors.password || null,
        email: errors.email || null,
        confirmePassword: errors.confirmePassword || null,
      },
    };
  }
  return { errors: null, data: result.data };
};
export const validateLogInUser = ({
  userName,
  password,

}: LogInUserType) => {
  const userSchema = z
    .object({
      userName: z
        .string({ message: "User name must be a string" })
        .trim()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(100, { message: "Username must be less than 50 characters long." })
        .regex(/^[a-zA-Z0-9_\s\u0600-\u06FF\u00C0-\u017F]*$/, {
          message:
            "Username can only contain alphanumeric characters and underscores.",
        })
        .nonempty({ message: "User name is required" }),
      password: z
        .string({ message: "Password must be a string." })
        .min(8, { message: "Password must be at least 8 characters long." })
        .nonempty({ message: "Password is required" }),
   
    })
    

  const result = userSchema.safeParse({
    userName,
    password,

  });
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      errors: {
        userName: errors.userName || null,
        password: errors.password || null,
      
      },
    };
  }
  return { errors: null, data: result.data };
};


