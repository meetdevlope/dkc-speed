"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { cn } from "utils/helpers";
import Icon from "./icon/Icon";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  direction?: "left" | "right" | "down";
};

const Drawer: React.FC<DrawerProps> = (props) => {
  const { onClose, isOpen = false, children, direction = "left" } = props;

  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[51] h-dvh w-screen overflow-hidden bg-black/50 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        className={cn(
          `fixed z-[51] transform bg-white shadow-lg transition-transform duration-[400ms]`,
          direction === "right" &&
            `top-0 right-0 h-full w-full max-w-lg translate-x-0 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`,
          direction === "left" &&
            `top-0 left-0 h-full w-full max-w-lg translate-x-0 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`,
          direction === "down" &&
            `right-0 bottom-0 left-0 max-h-[90dvh] w-full translate-y-0 rounded-t-2xl ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`,
        )}
      >
        <button
          className={cn(
            `fall absolute z-[100] size-8 cursor-pointer rounded-full bg-white text-gray-900 hover:bg-neutral-100`,
            direction === "right" && "top-5 right-4",
            direction === "left" && `top-5 right-4`,
            direction === "down" && "top-2 right-2",
          )}
          onClick={onClose}
        >
          <Icon
            name="close"
            iconType="stroke"
            className="stroke-[1.3]"
            color="var(--neutral-400)"
            size={26}
          />
        </button>
        <div
          className={`no-scrollbar relative z-[52] overflow-y-auto bg-white ${direction === "down" ? "h-auto rounded-t-2xl p-2 pt-4" : "h-dvh"}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
