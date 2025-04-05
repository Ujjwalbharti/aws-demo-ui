"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { token } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [token, router, pathname]);

  if (!token) return null;

  return <>{children}</>;
}
