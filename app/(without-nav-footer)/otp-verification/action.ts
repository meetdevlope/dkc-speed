import toast from "react-hot-toast";
import { BaseApiResponse } from "types/baseApiTypes";

export const resendEmail = async (email: string): Promise<boolean> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/resend-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    const data: BaseApiResponse<boolean> = await res.json();

    if (!res.ok) {
      toast.error(`${data?.message}`);
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    const msg = error as string;
    throw new Error(msg);
  }
};
