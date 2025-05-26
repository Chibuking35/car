"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) {
      setStatus("No token provided.");
      return;
    }

    async function verifyEmail() {
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        setStatus("Email verified successfully! You can now log in.");
      } else {
        setStatus("Invalid or expired verification token.");
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <div className="max-w-md min-h-screen mx-auto mt-20 text-center p-4">
      <p>{status}</p>
    </div>
  );
}
