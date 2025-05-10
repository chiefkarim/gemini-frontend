"use client";
import { signOut } from "next-auth/react";

export function SignOutBtn() {
  return (
    <button
      className="bg-blue-300 px-2 py-1 rounded"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  );
}
