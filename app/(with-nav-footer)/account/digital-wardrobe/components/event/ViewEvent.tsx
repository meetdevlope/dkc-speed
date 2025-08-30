"use client";

import { useMutation } from "@tanstack/react-query";
import Dialog from "components/Dialog";
import { ImageComponent } from "components/image-component/ImageComponent";
import { useToggle } from "hooks/useToggle";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { deleteEvent } from "../../family-member/[id]/actions";

interface ViewEventProps {
  photos: string[];
  event: string;
  product: string;
  familyMember: string;
  date: string;
  description: string;
  id: string;
  token: string;
  children?: ReactNode;
}

const ViewEvent: React.FC<ViewEventProps> = (props) => {
  const {
    event,
    date,
    description,
    familyMember,
    photos,
    product,
    id,
    token,
    children,
  } = props;

  const { close, isOpen, open } = useToggle();
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: () => deleteEvent(token, id),
    onSuccess: () => {
      close();
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
      <div onClick={open}>{children}</div>
      <Dialog
        isOpen={isOpen}
        onClose={close}
        title={"Events and Journaling"}
        actions={{
          primary: {
            label: "Delete",
            onClick: handleDelete,
            loading: mutation.isPending,
            size: "sm",
            className: "bg-red-700 hover:bg-red-800",
          },
        }}
      >
        <div>
          <div className="mb-3 grid grid-cols-5">
            {photos?.map((item, index) => (
              <Zoom
                zoomImg={{
                  src: item,
                  alt: "Zoomed virtual try-on image",
                }}
                key={index}
              >
                <ImageComponent
                  src={item}
                  alt={`Image-alt ${product}`}
                  className="rounded-md object-cover"
                  width={110}
                  height={110}
                />
              </Zoom>
            ))}
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <span className="rounded bg-purple-50 p-1 text-xs text-purple-700 capitalize">
              {event}
            </span>
            <h3>{product}</h3>
            <h6>
              {familyMember} - {date}
            </h6>
            <h6 className="text-neutral-400">{description}</h6>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewEvent;
