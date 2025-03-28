"use client";

import { signIn } from "next-auth/react";

export function SignInBtn() {
  return (
    <button
      className="bg-blue-300  px-2 py-1 rounded"
      onClick={() => signIn("google")}
    >
      Sign in
    </button>
  );
}
