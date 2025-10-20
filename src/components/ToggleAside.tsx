import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatchType, RootStateType } from "../redux/store";
import { Button } from "@heroui/react";
import { appActions } from "../redux/slices/appSLice";

const ToggleAside = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const { isAsideOpen } = useSelector((state: RootStateType) => state.app);
  const handelAsideToggle = () => {
    dispatch(appActions.setAsideOpen(!isAsideOpen));
  };
  return <Button onPress={handelAsideToggle}>ToggleAside</Button>;
};

export default ToggleAside;
