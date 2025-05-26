"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/request-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("chibuike", data);

    if (res.ok && !data.error) {
      setMessage("OTP sent to your email.");
      router.push("/verify-otp");
    } else {
      setMessage(
        `Failed to send OTP. # ${data.error.message}. # Error type: ${data.error.name}`
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full mb-4"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Send OTP
      </button>
      {message && (
        <div className="mt-4">
          {message.split("#").map((line, key) => (
            <p className="text-red-500" key={key}>
              {line}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}
