"use client";

import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import React from "react";
import { FamilyMember } from "../../../action";
import { useRouter } from "next/navigation";
import { Button } from "components/Button";
import { ROUTES } from "utils/routes";
import { useMutation } from "@tanstack/react-query";
import { deleteFamilyMember } from "../actions";

interface DeleteFamilyMemberProps {
  token: string;
  member: FamilyMember;
}

const DeleteMember: React.FC<DeleteFamilyMemberProps> = (props) => {
  const { token, member } = props;
  const { close, isOpen, open } = useToggle();
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: () => deleteFamilyMember(token, member?._id),
    onSuccess: () => {
      close();
      route.push(ROUTES.ACCOUNT.DIGITAL_WARDROBE.ROOT);
      route.refresh();
    },
    onError: (error) => {
      console.error("Failed to delete family member:", error);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button
        onClick={open}
        className="cursor-pointer text-sm font-medium text-primary-500 underline"
      >
        Delete
      </button>
      <Dialog
        isOpen={isOpen}
        onClose={close}
        title="Delete Family Member"
        noClose
      >
        <div className="flex flex-col gap-y-4">
          <h6 className="text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{member.name}</span>?
          </h6>
          <div className="mt-4 flex justify-end gap-x-2">
            <Button size="md" type="button" onClick={close} variant="outline">
              Cancel
            </Button>
            <Button
              size="md"
              type="button"
              onClick={handleDelete}
              isLoading={mutation.isPending}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteMember;
