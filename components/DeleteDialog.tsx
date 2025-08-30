import React, { useMemo } from "react";
import Dialog, { DialogProps } from "./Dialog";

type DeleteDialogProps = {
  title?: string;
  subTitle?: string;
  name?: string;
  isOpen: boolean;
  close: () => void;
  deleteFunc: () => void;
};

const DeleteDialog: React.FC<DeleteDialogProps> = (props) => {
  const { close, isOpen, name, title, deleteFunc, subTitle } = props;

  const actions = useMemo<DialogProps["actions"]>(
    () => ({
      primary: {
        label: "Delete",
        onClick: deleteFunc,
        bgColor: "red",
      },
    }),
    [deleteFunc],
  );

  return (
    <Dialog
      title={title || `Delete?`}
      isOpen={isOpen}
      onClose={close}
      actions={actions}
    >
      <h5> {subTitle || `Are you sure you want to delete ${name || ""}?`} </h5>
    </Dialog>
  );
};

export default DeleteDialog;
