"use client";

import React from "react";
import { EmailOTP } from "utils/emailOTP";

type OTPEmailProps = {
  email: string;
};

const OTPEmail: React.FC<OTPEmailProps> = (props) => {
  const { email } = props;

  const userLocalEmail = EmailOTP.getLocalEmail();

  return (
    <h5 className="mt-3 font-normal text-neutral-400">
      Enter the verification code we just sent on your email address -{" "}
      <span className="text-base font-medium text-black">
        {email || userLocalEmail || ""}
      </span>
    </h5>
  );
};

export default OTPEmail;
