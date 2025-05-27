// "use client";

// import { useState } from "react";

// export default function VerifyOtpPage() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setMessage("");

//     const res = await fetch("/api/verify-otp", {
//       method: "POST",
//       body: JSON.stringify({ email, otp, newPassword }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();
//     console.log(data, res.ok);

//     if (res.ok) {
//       setMessage("Password reset successful! You can now log in.");
//     } else {
//       const text = await res.text();
//       setMessage(`Error: ${text}`);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">Reset Password</h1>
//       <input
//         type="email"
//         placeholder="Your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="border p-2 w-full mb-4"
//       />
//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         required
//         className="border p-2 w-full mb-4"
//       />
//       <input
//         type="password"
//         placeholder="New password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         required
//         className="border p-2 w-full mb-4"
//       />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2">
//         Reset Password
//       </button>
//       {message && <p className="mt-4">{message}</p>}
//     </form>
//   );
// }
// app/verify-otp/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(180);
  const [isResending, setIsResending] = useState(false);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Missing email. Please restart the password reset process.");
      return;
    }

    const joinedOtp = otp.join("");
    if (joinedOtp.length !== 6) {
      setMessage("Please enter all 6 digits.");
      return;
    }

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp: joinedOtp }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      const text = await res.text();
      setMessage(`Error: ${text}`);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      setIsResending(true);
      setMessage("");

      const res = await fetch("/api/request-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("OTP resent successfully.");
        setOtp(Array(6).fill(""));
        setTimer(120); // Reset timer to 2 minutes
      } else {
        setMessage(result.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    } finally {
      setIsResending(false);
    }
  };

  const isOtpFilled = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen mt-20">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Verification Code</h1>

        <h2 className="p-5 text-gray-400 text-center">
          We have sent you a verification code to your email
        </h2>

        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          type={isOtpFilled ? "submit" : "button"}
          onClick={!isOtpFilled ? handleResend : undefined}
          disabled={!isOtpFilled && timer > 0}
          className={`w-full py-2 rounded-md text-white ${
            isOtpFilled || timer <= 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isOtpFilled
            ? "Confirm"
            : isResending
            ? "Resending..."
            : timer > 0
            ? `Resend OTP (${formatTime(timer)})`
            : "Resend OTP"}
        </button>

        {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      </form>
    </div>
  );
}
