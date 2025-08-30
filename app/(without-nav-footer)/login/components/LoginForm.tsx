"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/Button";
import ErrorText from "components/ErrorText";
import { Input } from "components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BaseApiResponse } from "types/baseApiTypes";
import { User } from "types/user.types";
import { EmailOTP } from "utils/emailOTP";
import { generateAndSetDeviceID } from "utils/generateAndSetDeviceId";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { ROUTES } from "utils/routes";
import { setUserEmail } from "utils/user-email";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Must be a valid email"),
});

type LoginFormFields = z.infer<typeof loginSchema>;

type LoginFormProps = {
  deviceId: string;
  redirectTo?: string;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { deviceId, redirectTo } = props;

  const deviceIdClient = getDeviceIdClient();
  const router = useRouter();

  const deviceIdValue = deviceIdClient || deviceId;

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const { email } = data;

    try {
      const newDeviceId = await generateAndSetDeviceID();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/v2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: email,
            userDeviceId: deviceIdValue || newDeviceId,
          }),
        },
      );
      const data: BaseApiResponse<User> = await res.json();

      if (!res.ok) {
        toast.error(`${data?.message}`);
        setError("root", {
          message: `${res.status} ${res.statusText}`,
        });
        throw new Error(`${data?.message}`);
      }

      if (!data?.data?.isVerified) {
        EmailOTP.setLocalEmail(data?.data?.email);
      }

      if (data?.data) {
        setUserEmail(data?.data?.email);
        if (email) {
          router.push(
            `/otp-verification?email=${email}&redirectTo=${redirectTo}`,
          );
        }
      }
    } catch (error) {
      setError("root", {
        message: `${error}`,
      });
      console.log(error);
    }
  };

  return (
    <div className="mt-8 lg:mt-10">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          placeholder="Enter your email here"
          variant="filled"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          inputSize="md"
        />

        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className="self-end text-xs text-neutral-400 hover:text-neutral-500 hover:underline"
        >
          Forgot password?
        </Link>
        <Button className="mt-8" type="submit" isLoading={isSubmitting}>
          Login
        </Button>
        {errors.root && <ErrorText> {errors.root.message} </ErrorText>}
      </form>
    </div>
  );
};

export default LoginForm;
