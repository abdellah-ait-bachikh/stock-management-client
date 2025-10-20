import { useDispatch, useSelector } from "react-redux";
import { type AppDispatchType, type RootStateType } from "../redux/store";
import { Button, cn } from "@heroui/react";
import { appActions } from "../redux/slices/appSLice";

const Aside = () => {
  const { isAsideOpen } = useSelector((state: RootStateType) => state.app);
  const dispatch = useDispatch<AppDispatchType>();
  const handelCloseAside = () => {
    dispatch(appActions.setAsideOpen(!isAsideOpen));
  };
  return (
    <div
      className={cn(
        "fixed h-screen z-999 overflow-hidden lg:static bg-lime-300 transition-width duration-300",
        {
          "w-screen lg:w-[240px]": isAsideOpen,
          "w-0 lg:w-[100px]": !isAsideOpen,
        }
      )}
    >
      {isAsideOpen ? "open" : "closed"}
      <Button className="lg:hidden" onPress={handelCloseAside}>close</Button>
    </div>
  );
};

export default Aside;
