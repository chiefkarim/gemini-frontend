"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

//TODO: add topast for better user experince
export function SignInBtn() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSignIn} disabled={loading}>
      {loading ? "Signing in..." : "Sign in"}
    </Button>
  );
}
