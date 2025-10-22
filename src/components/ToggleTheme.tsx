import { Button } from "@heroui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatchType, RootStateType } from "../redux/store";
import { appActions } from "../redux/slices/appSLice";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";

const ToggleTheme = () => {
  const { theme } = useSelector((state: RootStateType) => state.app);
  const dispatch = useDispatch<AppDispatchType>();
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const handelToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    dispatch(appActions.setTheme(newTheme));
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };
  console.log(theme);
  return (
    <Button
      isIconOnly
      variant="light"
      color="default"
      onPress={handelToggleTheme}
      radius="lg"
      
    >
      {theme === "dark" ? <GoSun size={24} /> : <IoMoonOutline size={24} />}
    </Button>
  );
};

export default ToggleTheme;
