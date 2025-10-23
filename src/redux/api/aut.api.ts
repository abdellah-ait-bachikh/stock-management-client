import { addToast, toast } from "@heroui/react";
import type {
  RegisterUserType,
  ValidationRegisterUserErrorsType,
} from "../../lib/types";
import { replaceEmptyStringsWithUndefined, request } from "../../lib/utils";
import { authActions } from "../slices/authSlice";
import type { AppDispatchType } from "../store";

export const registerUser =
  (
    formData: RegisterUserType,
    setLoading: (value: boolean) => void,
    setValidationErrors: (
      validationError: ValidationRegisterUserErrorsType
    ) => void,
    cb?: () => void
  ) =>
  async (dispatch: AppDispatchType) => {
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
