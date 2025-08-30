"use client";

import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import Spinner from "components/spinner/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { ROUTES } from "utils/routes";
import { setUserEmail } from "utils/user-email";

const VerifySSOScreen = (props) => {
  const { searchParams } = props;
  const deviceIdClient = getDeviceIdClient();

  const route = useRouter();

  const setToken = useCallback(
    async (token: string, redirectTo: string) => {
      await fetch(
        `/api/register?token=${token}`,
        // `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/register?token=${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      ).finally(() => {
        route.replace(decodeURIComponent(redirectTo) || ROUTES.SHOP);
      });
    },
    [route],
  );

  const verifyAuth = useCallback(async () => {
    const code = searchParams?.code;
    const userToken = searchParams?.userToken;
    const userEmail = searchParams?.userEmail;
    const redirectTo = searchParams?.redirectTo || ROUTES.SHOP;

    if (userToken && userEmail) {
      await setToken(userToken, redirectTo);
      setUserEmail(userEmail);
    }

    if (code) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationCode: code,
            forForgotPassword: false,
            userDeviceId: deviceIdClient,
          }),
        },
      );
      const data = await res.json();

      const token = data?.data?.token;
      if (token) {
        setUserEmail(data?.data?.user?.email);
        await setToken(token, redirectTo);
      }
    }
  }, [searchParams?.code, setToken]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return (
    <div className="fall h-screen w-screen bg-white">
      <div className="flex flex-col items-center gap-6 rounded-xl border-[0.5px] border-neutral-200 px-10 py-6 shadow-md">
        <h2 className="text-primary-500">DKC</h2>
        <h6 className="font-medium text-neutral-600">
          Verifying your authentication
        </h6>
        <div className="flex flex-col items-center gap-4">
          <span>Please hang tight</span>
          <Spinner size={32} color="var(--primary-500)" />
        </div>
        <Link href={ROUTES.LOGIN}>
          <Button
            size="sm"
            variant="outline"
            startIcon={
              <Icon
                name="chevron"
                color="var(--neutral-400)"
                iconType="stroke"
                className="-rotate-90"
                size={22}
              />
            }
          >
            Back to Login
          </Button>
        </Link>
        <h6 className="text-description mt-auto pb-6 text-center">
          Need help?{" "}
          <Link
            className="font-secondary font-medium text-neutral-400 underline"
            href={ROUTES.CONTACT_US}
          >
            Contact our support team!
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default VerifySSOScreen;
