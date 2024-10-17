"use client";
import { SessionProvider } from "next-auth/react";

export function NextAuthProvider({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
