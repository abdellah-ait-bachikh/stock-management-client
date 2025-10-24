import ToggleTheme from "../../components/ToggleTheme";
import { Button, Input } from "@heroui/react";
import { useState, type FormEvent } from "react";
import type {
  RegisterUserFieldsType,
  RegisterUserType,
  ValidationRegisterUserErrorsType,
} from "../../lib/types";
import { validateRegisterUser } from "../../lib/validation/auth";
import { checkIfIsValid, hasErrors } from "../../lib/utils";
import InputErrorMessages from "../../components/InputErrorMessages";
import { registerUser } from "../../redux/api/aut.api";
import { useDispatch } from "react-redux";
import type { AppDispatchType } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [validationErrors, setValidationErrors] =
    useState<ValidationRegisterUserErrorsType>({
      userName: null,
      password: null,
      confirmePassword: null,
      email: null,
    });
  const [formData, setFormData] = useState<RegisterUserType>({
    userName: "",
    password: "",
    confirmePassword: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();
  const handelChange = (field: RegisterUserFieldsType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    handelValidation(field, value);
  };

  const handelValidation = (field: RegisterUserFieldsType, value: string) => {
    const result = validateRegisterUser({ ...formData, [field]: value });

    if (result.errors) {
      const fieldErrors = result.errors[field];
      setValidationErrors((prev) => ({ ...prev, [field]: fieldErrors }));
    } else {
      setValidationErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser(
        formData,
        (value: boolean) => {
          setIsLoading(value);
        },
        (validationError: ValidationRegisterUserErrorsType) => {
          setValidationErrors(validationError);
        },
        () => navigate("/auth/login")
      )
    );
  };
  return (
    <div className="w-screen h-screen dark:bg-neutral-800 bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handelSubmit}
        className="mx-5 md:mx-0 w-full md:w-[500px] bg-white dark:bg-neutral-900 rounded-4xl p-8 flex flex-col gap-5 border-3 border-neutral-200 dark:border-neutral-700"
      >
        <div className="flex items-center justify-between ">
          <h1 className="md:text-4xl text-3xl font-bold ">Register</h1>
          <ToggleTheme />
        </div>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="enter the user name"
            label="User name"
            classNames={{ label: "font-semibold text-md" }}
            variant="flat"
            value={formData.userName}
            onChange={(e) => {
              handelChange("userName", e.target.value);
            }}
            isInvalid={
              formData.userName === ""
                ? false
                : checkIfIsValid(validationErrors, "userName")
            }
            errorMessage={
              <InputErrorMessages
                errorMessages={validationErrors["userName"]}
              />
            }
          />
          <Input
            placeholder="enter the password"
            label="Password"
            classNames={{ label: "font-semibold text-md" }}
            variant="flat"
            value={formData.password}
            onChange={(e) => {
              handelChange("password", e.target.value);
            }}
            isInvalid={
              formData.password === ""
                ? false
                : checkIfIsValid(validationErrors, "password")
            }
            errorMessage={
              <InputErrorMessages
                errorMessages={validationErrors["password"]}
              />
            }
          />
          <Input
            placeholder="enter the password again"
            label="Confirme password"
            classNames={{ label: "font-semibold text-md" }}
            variant="flat"
            value={formData.confirmePassword}
            onChange={(e) => {
              handelChange("confirmePassword", e.target.value);
            }}
            isInvalid={
              formData.confirmePassword === ""
                ? false
                : checkIfIsValid(validationErrors, "confirmePassword")
            }
            errorMessage={
              <InputErrorMessages
                errorMessages={validationErrors["confirmePassword"]}
              />
            }
          />
          <Input
            placeholder="enter your real email"
            label="Email"
            classNames={{ label: "font-semibold text-md" }}
            variant="flat"
            value={formData.email}
            onChange={(e) => {
              handelChange("email", e.target.value);
            }}
            isInvalid={
              formData.email === ""
                ? false
                : checkIfIsValid(validationErrors, "email")
            }
            errorMessage={
              <InputErrorMessages errorMessages={validationErrors["email"]} />
            }
          />
        </div>
        <div>
          <Button
            fullWidth
            color="success"
            className="font-semibold  tracking-widest text-white"
            type="submit"
            isLoading={isLoading}
            isDisabled={
              !formData.userName ||
              !formData.password ||
              !formData.confirmePassword ||
              hasErrors(validationErrors)
            }
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
