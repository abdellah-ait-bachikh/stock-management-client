import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export const UserCardDetails = () => {
  return (
    <Card className="max-w-[320px] border-none bg-transparent" shadow="none">
      <CardHeader className="justify-between gap-3">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Abdellah ait bachikh
            </h4>
            <h5 className="text-small tracking-tight text-default-500">
              @Admin
            </h5>
          </div>
        </div>
        <Button
          color="danger"
          radius="full"
          size="sm"
          variant={"solid"}
          onPress={() => {}}
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
  );
};
