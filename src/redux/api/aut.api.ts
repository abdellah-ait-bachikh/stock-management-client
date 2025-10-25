import { addToast } from "@heroui/react";
import type {
  LogInUserType,
  RegisterUserType,
  ValidationLogInUserErrorsType,
  ValidationRegisterUserErrorsType,
} from "../../lib/types";
import { replaceEmptyStringsWithUndefined, request } from "../../lib/utils";
import type { AppDispatchType } from "../store";
import { authActions } from "../slices/authSlice";
import { removeUser, saveUser } from "../../lib/tauriStore";

export const registerUser =
  (
    formData: RegisterUserType,
    setLoading: (value: boolean) => void,
    setValidationErrors: (
      validationError: ValidationRegisterUserErrorsType
    ) => void,
    cb?: () => void
  ) =>
  async (_dispatch: AppDispatchType) => {
    setLoading(true);
    console.log(replaceEmptyStringsWithUndefined(formData));
    try {
      const res = await request.post(
        `/api/auth/admin/register`,
        replaceEmptyStringsWithUndefined(formData)
      );
      if (res.status === 201) {
        addToast({
          title: "Registration Successful",
          description: res.data.message,
          color: "success",
        });
        if (cb) {
          cb();
        }
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setValidationErrors(error.response.data.errors);
          addToast({
            title: "Invalid Credentials",
            description: error.response.data.message,
            color: "danger",
          });
        } else if (status === 500) {
          addToast({
            title: "Server Error",
            description:
              error.response.data.message ||
              "Something went wrong on the server.",
            color: "danger",
          });
        } else {
          addToast({
            title: "Error",
            description:
              error.response.data.message || "An unexpected error occurred.",
            color: "danger",
          });
        }
      } else {
        addToast({
          title: "Network Error",
          description: error.message,
          color: "danger",
        });
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

export const LogInUser =
  (
    formData: LogInUserType,
    setLoading: (value: boolean) => void,
    setValidationErrors: (
      validationError: ValidationLogInUserErrorsType
    ) => void,
    cb?: () => void
  ) =>
  async (dispatch: AppDispatchType) => {
    setLoading(true);
    try {
      const res = await request.post(`/api/auth/login`, formData);
      if (res.status === 201) {
        const { userId, message } = res.data;

        dispatch(authActions.setLoginUserId(userId));
        await saveUser(userId); // only save userId

        addToast({
          title: "Login Successful",
          description: message,
          color: "success",
        });

        if (cb) cb();
      }
      // if (res.status === 201) {

      //   dispatch(authActions.setLoginUserId(res.data.userId));
      //   // localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      //    await saveUser(res.data.userId);
      //    addToast({
      //     title: "Login Successful",
      //     description: res.data.message,
      //     color: "success",
      //   });
      //   if (cb) {
      //     cb();
      //   }
      // }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setValidationErrors(error.response.data.errors);
          addToast({
            title: "Invalid Credentials",
            description: error.response.data.message,
            color: "danger",
          });
        } else if (status === 500) {
          addToast({
            title: "Server Error",
            description:
              error.response.data.message ||
              "Something went wrong on the server.",
            color: "danger",
          });
        } else {
          addToast({
            title: "Error",
            description:
              error.response.data.message || "An unexpected error occurred.",
            color: "danger",
          });
        }
      } else {
        addToast({
          title: "Network Error",
          description: error.message,
          color: "danger",
        });
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

export const getCurrectUSer =
  (setLoading: (value: boolean) => void) =>
  async (dispatch: AppDispatchType) => {
    try {
      const res = await request.get("/api/auth/users/me", {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(authActions.setLoginUser(res.data.user)); // full user object
      }
    } catch (error: any) {
      dispatch(authActions.setLoginUser(null));

      if (!error.response) {
        addToast({
          title: "Network Error",
          description: "Please check your internet connection and try again.",
          color: "danger",
        });
      } else {
        // Server returned an error (e.g., 401 Not authenticated)
        addToast({
          title: "Login",
          description:
            error.response.data?.message || "Failed to fetch current user.",
          color: "danger",
        });

        // Clear user only on authentication/server error
        dispatch(authActions.setLoginUser(null));
      }

      console.error("Fetch current user error:", error);
    } finally {
      setLoading(false);
    }
  };

export const logOutUser =
  (setModaleOpen: (value: boolean) => void) =>
  async (dispatch: AppDispatchType) => {
    try {
      await request.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (error: any) {
      if (!error.response) {
        // Network error
        addToast({
          title: "Network Error",
          description: "Please check your internet connection and try again.",
          color: "danger",
        });
      } else {
        // Server returned an error
        addToast({
          title: "Logout Error",
          description: error.response.data?.message || "Failed to log out.",
          color: "danger",
        });

        // Still clear local user in case server-side session is invalid
        dispatch(authActions.setLoginUserId(null));
        dispatch(authActions.setLoginUser(null));
        await removeUser();
        localStorage.removeItem("currentUser");
      }

      console.error("Logout error:", error);
    } finally {
      dispatch(authActions.setLoginUser(null));
      dispatch(authActions.setLoginUserId(null));
      await removeUser();
      localStorage.removeItem("userId");
      setModaleOpen(false);

      addToast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        color: "primary",
      });
    }
  };
