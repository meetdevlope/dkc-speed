import { Button } from "components/Button";
import Link from "next/link";
import React from "react";
import { ROUTES } from "utils/routes";

const NotFound = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center bg-blue-light px-4">
      <div className="mx-auto max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <div className="text-muted-foreground/20 text-7xl font-bold select-none md:text-8xl">
            <h3 className="font-secondary text-2xl sm:text-3xl md:text-4xl">
              404
            </h3>
          </div>
          <div className="space-y-2">
            <h1 className="text-foreground text-xl font-semibold md:text-2xl">
              Page not found
            </h1>
            <h6 className="mx-auto leading-relaxed text-gray-500">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
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

export default NotFound;
