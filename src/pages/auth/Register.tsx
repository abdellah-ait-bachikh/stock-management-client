import { Link } from "react-router-dom";
import ToggleTheme from "../../components/ToggleTheme";
import { Button, Input } from "@heroui/react";

const Register = () => {
  return (
    <div className="w-screen h-screen dark:bg-neutral-800 bg-gray-100 flex items-center justify-center">
      <div className="mx-5 md:mx-0 w-full md:w-[500px] bg-white dark:bg-neutral-900 rounded-4xl p-8 flex flex-col gap-5 border-3 border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between ">
          <h1 className="md:text-4xl text-3xl font-bold ">Register</h1>
          <ToggleTheme />
        </div>
        <div className="flex flex-col gap-3">
          <Input placeholder="enter the user name" label="User name"classNames={{label:'font-semibold text-md'}} variant="faded"  />
          <Input placeholder="enter the password" label="Password" classNames={{label:'font-semibold text-md'}} variant="faded" />
          <Input placeholder="enter the password again" label="Confirme password" classNames={{label:'font-semibold text-md'}} variant="faded" />
          <Input placeholder="enter your real email" label="Email" classNames={{label:'font-semibold text-md'}} variant="faded" />
        </div>
        <div>
          <Button
            fullWidth
            color="success"
            className="font-semibold  tracking-widest text-white"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
