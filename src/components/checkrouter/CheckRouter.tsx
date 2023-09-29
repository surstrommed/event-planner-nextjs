"use client";

import { usePathname, redirect } from "next/navigation";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@consts/api";
import { useSession } from "next-auth/react";
import { Loader } from "@components/loader/Loader";
import { PropsWithChildren, Suspense } from "react";

const CheckRouter = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const { status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  if (
    Object.values(PROTECTED_ROUTES).some((r) => r === pathname) &&
    status === "unauthenticated"
  ) {
    redirect(PUBLIC_ROUTES.auth);
  }

  if (PUBLIC_ROUTES.auth === pathname && status === "authenticated") {
    redirect(PUBLIC_ROUTES.main);
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default CheckRouter;
