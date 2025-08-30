"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { resendEmail } from "../action";
import toast from "react-hot-toast";

type ResendOTPProps = {
  email: string;
};

const ResendOTP: React.FC<ResendOTPProps> = (props) => {
  const { email } = props;

  const [enableResend, setEnableResend] = useState(false);
  const [timer, setTimer] = useState(30);

  const resetTimer = () => {
    setTimer(30);
    setEnableResend(false);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setEnableResend(true);
    }
  }, [timer]);

  const { mutateAsync: resendOtp, isPending } = useMutation({
    mutationKey: [`resend-otp-email`],
    mutationFn: () => resendEmail(email),
    onSuccess: (data) => {
      if (data) {
        toast.success("OTP sent");
        resetTimer();
      } else {
        toast.error("Failed to send the OTP");
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Could sent the OTP. Try again!");
    },
  });

  const handleResendClick = () => {
    if (enableResend && !isPending) {
      resendOtp();
    }
  };

  return (
    <h6 className="text-description mt-auto pb-6 text-center">
      Haven&apos;t received the code yet?{" "}
      <span
        onClick={handleResendClick}
        className={`font-secondary font-semibold ${enableResend ? "cursor-pointer text-black underline" : "text-description/50 cursor-not-allowed"}`}
      >
        {enableResend
          ? isPending
            ? "Sending"
            : "Resend"
          : `Resend in ${timer} sec`}
      </span>
    </h6>
  );
};

export default ResendOTP;
