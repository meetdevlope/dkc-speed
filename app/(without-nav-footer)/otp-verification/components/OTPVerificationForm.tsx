"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import OTPInput, { OTPInputHandle } from "components/OTPInput";
import ErrorText from "components/ErrorText";
import Spinner from "components/spinner/Spinner";

import { EmailOTP } from "utils/emailOTP";
import { setUserEmail } from "utils/user-email";

import { BaseApiResponse } from "types/baseApiTypes";
import { User } from "types/user.types";

type OTPVerificationFormProps = {
  email: string;
  redirectTo?: string;
};

type OTPVerifyResponse = {
  user: User;
  token: string;
};

const OTPVerificationForm: React.FC<OTPVerificationFormProps> = ({
  email: pEmail,
  redirectTo,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const otpInputRef = useRef<OTPInputHandle>(null);
  const router = useRouter();

  const userLocalEmail = EmailOTP.getLocalEmail();

  useEffect(() => {
    if (email && !userLocalEmail) {
      EmailOTP.setLocalEmail(email);
    }
  }, [email]);

  useEffect(() => {
    if (pEmail) {
      setEmail(pEmail);
    } else if (userLocalEmail) {
      setEmail(userLocalEmail);
    }
  }, [pEmail, userLocalEmail]);

  const setToken = async (token: string) => {
    return fetch(`/api/register?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  const verifyUserMutation = useMutation({
    mutationFn: async (verificationCode: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            verificationCode,
            email,
            forForgotPassword: true,
          }),
        },
      );

      const data: BaseApiResponse<OTPVerifyResponse> = await res.json();

      if (!res.ok) {
        const errMsg = data.message || res.statusText;

        if (errMsg === "USER_ALREADY_VERIFIED") {
          EmailOTP.removeLocalEmail();
          router.replace(redirectTo ? decodeURIComponent(redirectTo) : "/");
        }

        throw new Error(errMsg);
      }

      return data;
    },
    onSuccess: async (data) => {
      const token = data?.data?.token;

      if (!token) {
        toast.error("Token not available from login response");
        return;
      }

      EmailOTP.removeLocalEmail();
      setUserEmail(data?.data?.user?.email);

      try {
        await setToken(token);
      } finally {
        router.replace(redirectTo ? decodeURIComponent(redirectTo) : "/");
        router.refresh();
      }
    },
    onError: (err: Error) => {
      setError(`Error: ${err.message}`);
      toast.error(`Error: ${err.message}`);
      otpInputRef.current?.clearFields();
    },
  });

  const handleOTPComplete = (otp: string) => {
    verifyUserMutation.mutate(otp);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-start">
        <OTPInput onComplete={handleOTPComplete} ref={otpInputRef} />
      </div>

      {error && <ErrorText className="mt-4">{error}</ErrorText>}

      <div className="flex justify-center">
        {verifyUserMutation.isPending && (
          <Spinner size={28} className="mt-4" color="var(--neutral-400)" />
        )}
      </div>
    </div>
  );
};

export default OTPVerificationForm;
