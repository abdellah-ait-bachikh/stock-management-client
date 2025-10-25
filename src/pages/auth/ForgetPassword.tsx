import ToggleTheme from "../../components/ToggleTheme";
import { Button, Input } from "@heroui/react";
import { useState, type FormEvent } from "react";
import type {
  RegisterUserFieldsType,
  ValidationRegisterUserErrorsType,
} from "../../lib/types";
import { validateEmailUser } from "../../lib/validation/auth";
import { checkIfIsValid, hasErrors } from "../../lib/utils";
import InputErrorMessages from "../../components/InputErrorMessages";

import { useDispatch } from "react-redux";
import type { AppDispatchType } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/api/aut.api";

const ForgetPassword = () => {
  const [validationErrors, setValidationErrors] = useState<
    Pick<ValidationRegisterUserErrorsType, "email">
  >({ email: null });
  const [formData, setFormData] = useState<Pick<{ email: string }, "email">>({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const handleChange = (field: RegisterUserFieldsType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    handleValidation(field, value);
  };

  const handleValidation = (field: RegisterUserFieldsType, value: string) => {
    const { error } = validateEmailUser({ email: value });

    setValidationErrors((prev) => ({ ...prev, [field]: error?.email || null }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      forgotPassword(
        formData,
        (loading: boolean) => setIsLoading(loading),
        (errors: ValidationRegisterUserErrorsType) =>
          setValidationErrors(errors),
        () => navigate("/auth/login")
      )
    );
  };

  return (
    <div className="w-screen h-screen dark:bg-neutral-800 bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mx-5 md:mx-0 w-full md:w-[500px] bg-white dark:bg-neutral-900 rounded-4xl p-8 flex flex-col gap-5 border-3 border-neutral-200 dark:border-neutral-700"
      >
        <div className="flex items-center justify-between">
          <h1 className="md:text-4xl text-3xl font-bold">Forget Password</h1>
          <ToggleTheme />
        </div>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Enter your email"
            label="Email"
            classNames={{ label: "font-semibold text-md" }}
            variant="flat"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            isInvalid={
              formData.email !== "" && checkIfIsValid(validationErrors, "email")
            }
            errorMessage={
              <InputErrorMessages errorMessages={validationErrors.email} />
            }
          />
        </div>
        <div className="flex items-center justify-center">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="text-primary-500 hover:underline cursor-pointer"
          >
            Back
          </div>
        </div>
        <div>
          <Button
            fullWidth
            color="success"
            className="font-semibold tracking-widest text-white"
            type="submit"
            isLoading={isLoading}
            isDisabled={formData.email === "" || hasErrors(validationErrors)}
          >
            Send Temporary Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
