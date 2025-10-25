import { Button, cn } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../redux/slices/appSLice";

import { TbMenuDeep } from "react-icons/tb";
import type { RootStateType } from "../redux/store";
import ToggleTheme from "./ToggleTheme";

import ProfileAvatarUser from "./ProfileAvatarUser";

const Header = () => {
  const { isAsideOpen } = useSelector((state: RootStateType) => state.app);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(appActions.setAsideOpen(!isAsideOpen));
  };

  return (
    <header
      className={cn(
        "bg-white dark:bg-neutral-900 h-20 tracking-widest",
        "flex items-center justify-between px-6",
        "fixed top-0 right-0 left-0 z-10 transition-all duration-300",
        "lg:left-20 overflow-x-auto",
        {
          "lg:left-60": isAsideOpen,
          "lg:left-20": !isAsideOpen,
        }
      )}
    >
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <Button
          className="lg:hidden"
          isIconOnly
          variant="light"
          color="default"
          onPress={handleToggleSidebar}
          radius="lg"
          size="lg"
        >
          <TbMenuDeep size={23} />
        </Button>
        <h2 className="text-2xl font-semibold ">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <ToggleTheme />

        <ProfileAvatarUser />
      </div>
    </header>
  );
};

export default Header;
