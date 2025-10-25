import {
  Avatar,
  Badge,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { UserCardDetails } from "./UserCardDetails";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatchType, RootStateType } from "../redux/store";
import { useEffect, useState } from "react";
import { getCurrectUSer } from "../redux/api/aut.api";
import { isAdmin } from "../lib/utils";
import { FaRegUser } from "react-icons/fa6";

const ProfileAvatarUser = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const { user } = useSelector((state: RootStateType) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getCurrectUSer(setIsLoading));
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : user ? (
        <Popover showArrow offset={23} placement="bottom-end">
          <PopoverTrigger>
            <div>
              <Badge
                isOneChar
                shape="circle"
                color={isAdmin(user.role) ? "success" : "warning"}
                placement="bottom-left"
                size="lg"
                content={
                  isAdmin(user.role) ? (
                    <MdOutlineAdminPanelSettings color="white" />
                  ) : (
                    <FaRegUser  />
                  )
                }
              >
                <Avatar className="cursor-pointer" />
              </Badge>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <UserCardDetails user={user}  />
          </PopoverContent>
        </Popover>
      ) : (
        <div>errorget user</div>
      )}
    </>
  );
};

export default ProfileAvatarUser;
