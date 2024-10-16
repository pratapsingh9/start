"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function NextAuthProvider({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
