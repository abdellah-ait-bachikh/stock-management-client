import ToggleTheme from "../../components/ToggleTheme";
import { addToast, Button, Chip, Input, Tooltip } from "@heroui/react";
import type {
  LogInUserFieldsType,
  LogInUserType,
  ValidationLogInUserErrorsType,
} from "../../lib/types";
import type { AppDispatchType } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, type FormEvent } from "react";
import { validateLogInUser } from "../../lib/validation/auth";
import { LogInUser } from "../../redux/api/aut.api";
import { checkIfIsValid, hasErrors, request } from "../../lib/utils";
import InputErrorMessages from "../../components/InputErrorMessages";
import ScreenLoading from "../../components/ScreenLoading";

const Login = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [adminUsers, setAdminUsers] = useState<
    {
      id: string;
      userName: string;
      email: string | null;
    }[]
  >([]);
  useEffect(() => {
    const checkAdmins = async () => {
      setLoadingFetch(true);
      try {
        const res = await request.get("/api/auth/users/chack-if-admin-exists");
        if (res.status === 200) {
          if (!res.data.admins || res.data.admins.length === 0) {
            // No admins found, redirect to register
            navigate("/auth/register");
          } else {
            setAdminUsers(res.data.admins);
            // addToast({
            //   color: "success",
            //   title: "Admin users found",
            //   description: `Found ${res.data.admins.length} admin(s)`,
            // });
          }
        }
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 404) {
            addToast({
              color: "primary",
              title: "Warning",
              description: error.response.data?.message || error.message,
              timeout: Infinity,
            });
          } else {
            addToast({
              color: "danger",
              title: "Error checking admins",
              description: error.response.data?.message || error.message,
              timeout: Infinity,
            });
          }
          navigate("/auth/register");
        } else {
          addToast({
            color: "danger",
            title: "Network Error",
            description: error.message || "Unknown error",
            timeout: Infinity,
          });
        }
      } finally {
        setLoadingFetch(false);
      }
    };

    checkAdmins();
  }, [navigate]);

  const [validationErrors, setValidationErrors] =
    useState<ValidationLogInUserErrorsType>({
      userName: null,
      password: null,
    });
  const [formData, setFormData] = useState<LogInUserType>({
    userName: "",
    password: "",
  });

  const handelChange = (field: LogInUserFieldsType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    handelValidation(field, value);
  };

  const handelValidation = (field: LogInUserFieldsType, value: string) => {
    const result = validateLogInUser({ ...formData, [field]: value });

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
      LogInUser(
        formData,
        (value: boolean) => {
          setIsLoading(value);
        },
        (validationError: ValidationLogInUserErrorsType) => {
          setValidationErrors(validationError);
        },
        () => navigate("/")
      )
    );
  };

  if (loadingFetch) {
    return <ScreenLoading />;
  }
  return (
    <>
      <div className="w-screen h-screen dark:bg-neutral-800 bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handelSubmit}
          className="mx-5 md:mx-0 w-full md:w-[500px] bg-white dark:bg-neutral-900 rounded-4xl p-8 flex flex-col gap-5 border-3 border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center justify-between ">
            <h1 className="md:text-4xl text-3xl font-bold ">Login</h1>
            <ToggleTheme />
          </div>
          <div className="flex items-start gap-3 ">
            <h1 className="font-semibold text-lg">Admins :</h1>
            <div className="flex items-center gap-2 justify-start flex-1 flex-wrap">
              {adminUsers?.map((admin) => (
                <Tooltip
                  key={admin.id}
                  content={<div> {admin.email} </div>}
                  closeDelay={200}
                  color="foreground"
                >
                  <Chip color="success" variant="flat">
                    {admin.userName} abdellah
                  </Chip>
                </Tooltip>
              ))}
              {adminUsers?.map((admin) => (
                <Tooltip
                  key={admin.id}
                  content={<div> {admin.email} </div>}
                  closeDelay={200}
                  color="foreground"
                >
                  <Chip color="success" variant="flat">
                    {admin.userName} abdellah
                  </Chip>
                </Tooltip>
              ))}
              {adminUsers?.map((admin) => (
                <Tooltip
                  key={admin.id}
                  content={<div> {admin.email} </div>}
                  closeDelay={200}
                  color="foreground"
                >
                  <Chip color="success" variant="flat">
                    {admin.userName} abdellah
                  </Chip>
                </Tooltip>
              ))}
            </div>
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
                hasErrors(validationErrors)
              }
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
