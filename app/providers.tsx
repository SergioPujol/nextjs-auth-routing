"use client";

import { SessionProvider } from "next-auth/react";

type NextAuthProps = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: NextAuthProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};