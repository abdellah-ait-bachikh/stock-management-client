import { useDispatch, useSelector } from "react-redux";
import type { AppDispatchType, RootStateType } from "../redux/store";
import { appActions } from "../redux/slices/appSLice";
import { Button } from "@heroui/react";
import { IoCloseOutline, } from "react-icons/io5";

const CloseAside = () => {
  const { isAsideOpen } = useSelector((state: RootStateType) => state.app);
  const dispatch = useDispatch<AppDispatchType>();
  const handelCloseAside = () => {
    dispatch(appActions.setAsideOpen(!isAsideOpen));
  };
  return (
    <div>
      <Button
        className="md:hidden"
        isIconOnly
        variant="light"
        radius="full"
        color={ "danger" }
        onPress={handelCloseAside}
      >
       <IoCloseOutline size={28}  /> 
      </Button>
    </div>
  );
};

export default CloseAside;
