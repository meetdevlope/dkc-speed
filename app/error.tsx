"use client";

import { Button } from "components/Button";
import Link from "next/link";
import { ROUTES } from "utils/routes";

const ErrorScreen = ({ error }: { error: Error & { digest?: string } }) => {
  const isPageNotFound = error?.message?.includes(
    "Error: no page found for the slug provided",
  );

  return (
    <div className="bg-background flex min-h-screen items-center justify-center bg-blue-light px-4">
      <div className="mx-auto max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <div className="text-muted-foreground/20 font-bold select-none">
            <h3 className="font-secondary text-2xl sm:text-3xl md:text-4xl">
              {isPageNotFound ? "Page Not Found" : "Something went wrong"}
            </h3>
          </div>
          <div className="space-y-2">
            <h6 className="mx-auto leading-relaxed text-gray-500">
              {error.message || "An unexpected error occurred."}
            </h6>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={ROUTES.SHOP}>
            <Button size="md">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
