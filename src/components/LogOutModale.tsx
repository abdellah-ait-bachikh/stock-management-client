import { Button } from "@heroui/react";
import React from "react";

const LogOutModale = ({
  closeModal,
  handleConfirmLogout,
}: {
  closeModal: () => void;
  handleConfirmLogout: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-xl w-96 p-6 flex flex-col shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
        <p className="mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-3">
          <Button color="danger" variant="light" onPress={closeModal}>
            Cancel
          </Button>
          <Button color="primary" variant="flat" onPress={handleConfirmLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModale;
