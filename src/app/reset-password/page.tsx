"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRegEye } from "react-icons/fa6";
import { PiEyeClosedBold } from "react-icons/pi";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🆕 Toggle states for password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Missing email. Please restart the reset process.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, newPassword }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setMessage("Password reset successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        const text = await res.text();
        setMessage(`Error: ${text}`);
      }
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

        <div className="relative mb-4">
          <input
            type={showNewPassword ? "text" : "password"} // 🆕 toggle input type
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="bg-gray-200 p-2 w-full rounded-3xl px-5 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword((v) => !v)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            aria-label={showNewPassword ? "Hide password" : "Show password"}
          >
            {showNewPassword ? <FaRegEye /> :  <PiEyeClosedBold />}
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"} // 🆕 toggle input type
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-gray-200 p-2 w-full rounded-3xl px-5 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <FaRegEye /> :  <PiEyeClosedBold />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-3xl text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Reset Password"}
        </button>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.startsWith("Password reset")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
