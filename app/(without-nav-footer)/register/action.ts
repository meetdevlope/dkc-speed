"use server";

import { redirect } from "next/navigation";
import { fetchData } from "utils/apiCaller";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(1, "First Name cannot be empty"),
  lastName: z.string().min(1, "Last Name cannot be empty"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type RegisterFormTypes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export async function registerAction(prevState: any, formData: FormData) {
  const formEntries = Object.fromEntries(formData);

  const validationResult = registerSchema.safeParse(formEntries);

  const { email, firstName, lastName, password } =
    validationResult.data as RegisterFormTypes;

  const objectWithData: RegisterFormTypes = {
    email,
    firstName,
    lastName,
    password,
  };

  if (validationResult.success) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      },
    );

    const data = await res.json();
    console.log(data, "register data");
    if (data) {
      redirect(`/otp-verification?email=${data?.data?.user?.email}`);
    }
    // await createSession(data.data.token);
  } else {
    const errorMessages: Partial<Record<keyof RegisterFormTypes, string>> =
      Object.fromEntries(
        validationResult.error.errors.map((err) => [err.path[0], err.message]),
      );

    return { errors: errorMessages };
  }
}

export const getCountryList = async (): Promise<Country[]> => {
  return fetchData<Country[]>(`/common/country-list`, {
    errorMessage: "country-options",
  });
};

interface Country {
  iso: string;
  name: string;
  currency: string;
}
