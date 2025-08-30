"use client";

import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { Icons } from "./Icons";

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          duration: 4000,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)} className="fall">
                  <Icons.close />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default Toast;
