"use client";

import { useState } from "react";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp, newPassword }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data, res.ok);

    if (res.ok) {
      setMessage("Password reset successful! You can now log in.");
    } else {
      const text = await res.text();
      setMessage(`Error: ${text}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="border p-2 w-full mb-4"
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        className="border p-2 w-full mb-4"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Reset Password
      </button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
}
