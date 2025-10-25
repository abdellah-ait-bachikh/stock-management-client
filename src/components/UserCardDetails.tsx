import { Avatar, Button, Card, CardFooter, CardHeader } from "@heroui/react";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/api/aut.api";
import type { AppDispatchType } from "../redux/store";
import LogOutModale from "./LogOutModale";

export const UserCardDetails = ({
  user,
}: {
  user: {
    id: string;
    userName: string;
    role: string;
    email: string;
  };
}) => {
  const dispatch = useDispatch<AppDispatchType>();


  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logOutUser(closeModal));
    } catch (err: any) {
      console.error("Logout error:", err);
      closeModal();
    }
  };
  return (
    <>
      <Card className="max-w-[320px] border-none bg-transparent" shadow="none">
        <CardHeader className="justify-between gap-3">
          <div className="flex gap-3">
            <Avatar isBordered radius="full" size="md" />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {user.userName}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                <span className="capitalize"> @{user.role}</span>
              </h5>
            </div>
          </div>
          <Button
            color="danger"
            radius="full"
            size="sm"
            variant={"solid"}
            onPress={openModal}
          >
            Logout
          </Button>
        </CardHeader>

        <CardFooter className="gap-3 justify-between">
          <div className="flex gap-1 items-center">
            <div className="font-semibold text-default-600 text-small">
              <FaArrowUp />
            </div>
            <p className="font-semibold text-default-600 text-small">4</p>
            <p className=" text-default-500 text-small">Exports</p>
          </div>
          <div className="flex gap-1 items-center">
            <div className="font-semibold text-default-600 text-small">
              <FaArrowDown />
            </div>
            <p className="font-semibold text-default-600 text-small">97.1K</p>
            <p className="text-default-500 text-small">Imports</p>
          </div>
        </CardFooter>
      </Card>
      {isModalOpen && (
        <LogOutModale
          closeModal={closeModal}
          handleConfirmLogout={handleConfirmLogout}
        />
      )}
    </>
  );
};
