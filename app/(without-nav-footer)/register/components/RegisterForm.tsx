"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import { Input } from "components/Input";
import PhoneInput from "components/PhoneInput";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { generateAndSetDeviceID } from "utils/generateAndSetDeviceId";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { setUserEmail } from "utils/user-email";
import { BaseApiResponse } from "types/baseApiTypes";
import { User } from "types/user.types";

const dropdownOptionSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: dropdownOptionSchema,
  email: z.string().min(1, "Email is required").email("Must be a valid email"),
});

type RegisterFormFields = z.infer<typeof registerSchema>;

type RegisterResponse = {
  user: User;
  token: string;
};

type RegisterRequest = {
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  userDeviceId: string;
};

type RegisterFormProps = {
  deviceId: string;
  redirectTo?: string;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  deviceId,
  redirectTo,
}) => {
  const router = useRouter();
  const deviceIdClient = getDeviceIdClient();
  const deviceIdValue = deviceIdClient || deviceId;

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const registerUserMutation = useMutation({
    mutationFn: async (formData: RegisterFormFields) => {
      const { email, firstName, lastName, phoneNumber } = formData;
      const [countryCode, phoneNumberSplit] = phoneNumber.value.split(":");
      const newDeviceId = await generateAndSetDeviceID();

      const req: RegisterRequest = {
        email,
        firstName,
        lastName,
        countryCode,
        phoneNumber: phoneNumberSplit,
        userDeviceId: deviceIdValue || newDeviceId,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        },
      );

      const data: BaseApiResponse<RegisterResponse> = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      return data;
    },
    onSuccess: (data) => {
      const userEmail = data?.data?.user?.email;
      if (userEmail) {
        setUserEmail(userEmail);
        router.push(
          `/otp-verification?email=${userEmail}&redirectTo=${encodeURIComponent(redirectTo || "")}`,
        );
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setError("root", { message: error.message });
    },
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = (formData) => {
    registerUserMutation.mutate(formData);
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex w-full items-center gap-x-4">
          <Input
            label="First Name"
            placeholder="Enter your first name here"
            {...register("firstName")}
            error={errors.firstName?.message}
            helperText={errors.firstName?.message}
            fullWidth
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name here"
            {...register("lastName")}
            error={errors.lastName?.message}
            helperText={errors.lastName?.message}
            fullWidth
          />
        </div>

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <PhoneInput onChange={field.onChange} label="Phone number" />
          )}
        />

        <Input
          label="Email"
          placeholder="Enter your email here"
          {...register("email")}
          error={errors.email?.message}
          helperText={errors.email?.message}
        />

        <Button
          className="mt-4"
          type="submit"
          isLoading={registerUserMutation.isPending || isSubmitting}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
