// "use client";

// import { signIn, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { useState } from "react";
// import { FaArrowLeftLong, FaRegEye } from "react-icons/fa6";
// import { PiEyeClosedBold } from "react-icons/pi";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// // Zod validation schema for login
// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(4, "Please input your password"),
// });

// type LoginData = z.infer<typeof loginSchema>;

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const handleToggle = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const { data: session } = useSession();
//   if (session?.user) {
//     redirect("/shop");
//   }

//   // React Hook Form setup with Zod validation
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const credentialsAction = (data: LoginData) => {
//     signIn("credentials", {
//       email: data.email,
//       password: data.password,
//     });
//   };

//   return (
//     <div className="w-full min-h-screen p-5 relative">
//       <Image
//         src="/nature1.jpg"
//         alt="background picture"
//         fill
//         style={{ objectFit: "cover" }}
//         className="-z-10"
//       />
//       <div className="justify-center items-center">
//         <form
//           onSubmit={handleSubmit(credentialsAction)}
//           className="rounded-2xl py-5 w-full max-w-md mx-auto border-gray-200 bg-white/50 backdrop-blur-lg p-9 shadow-2xl"
//         >
//           <h1 className="text-center text-2xl py-7 font-semibold">Welcome back</h1>

//           {/* Email Input */}
//           <div className="mb-3">
//             <label htmlFor="email" className="block text-black mb-2 text-sm">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"

//               {...register("email")}
//               className="w-full p-2 px-3  bg-white rounded-3xl outline-none text-sm"
//               placeholder="email Address..."
//             />
//             {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
//           </div>

//           {/* Password Input */}
//           <div className="mb-3 relative">
//             <label htmlFor="password" className="block text-black mb-2 text-sm">
//               Password:
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
             
//               {...register("password")}
//               placeholder="***********"
//               className="w-full bg-white rounded-3xl outline-none text-sm font-semibold p-2 px-3 items-center"
//             />
//             {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
//             <button
//               className="absolute right-5 top-11 -translate-y-1/2 cursor-pointer"
//               type="button"
//               onClick={handleToggle}
//             >
//               {showPassword ? <FaRegEye /> : <PiEyeClosedBold />}
//             </button>
//           </div>

//           <div className="text-end"><Link href="/forgot-password">Forggot passwod ?</Link></div>

//           {/* Submit Button */}
//           <div className="flex justify-center items-center py-6">
//             <button
//               type="submit"
//               className="p-1 px-8 bg-blue-600 text-white rounded-full hover:scale-105 hover:bg-blue-950 hover:text-white"
//             >
//               Login
//             </button>
//           </div>

//           {/* Link to Register Page */}
//           <div className="flex justify-center items-center">
//             <h1 className="text-xs text-black">
//               Don't have an account
//               <Link href="/register" className="text-blue-600 text-sm">
//                 {" "}
//                 Register
//               </Link>{" "}
//               instead
//             </h1>
//           </div>
//         </form>
//       </div>

//       {/* Back Button */}
//       <div className="justify-center items-center flex-col flex py-10 p-3 gap-5">
//         <Link href="/">
//           <button className="px-8 flex flex-row gap-2 items-center p-1 bg-blue-600 text-white rounded-3xl shadow-2xl hover:scale-105 hover:bg-gray-400 transition duration-150 cursor-pointer">
//             <FaArrowLeftLong /> Back
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Login;

"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaArrowLeftLong, FaRegEye } from "react-icons/fa6";
import { PiEyeClosedBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod validation schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Please input your password"),
});

type LoginData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const { data: session } = useSession();
  if (session?.user) {
    redirect("/shop");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  // Async login handler with error handling
  const credentialsAction = async (data: LoginData) => {
    setLoginError(null);

    const result = await signIn("credentials", {
      redirect: false, // We will handle redirect manually
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      // Show generic error message
      setLoginError("Invalid email or password");
    } else if (result?.ok) {
      // Successful login: redirect to /shop
      window.location.href = "/shop";
    }
  };

  return (
    <div className="w-full min-h-screen p-5 relative">
      <Image
        src="/nature1.jpg"
        alt="background picture"
        fill
        style={{ objectFit: "cover" }}
        className="-z-10"
      />
      <div className="justify-center items-center">
        <form
          onSubmit={handleSubmit(credentialsAction)}
          className="rounded-2xl py-5 w-full max-w-md mx-auto border-gray-200 bg-white/50 backdrop-blur-lg p-9 shadow-2xl"
          noValidate
        >
          <h1 className="text-center text-2xl py-7 font-semibold">Welcome back</h1>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-black mb-2 text-sm">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full p-2 px-3 bg-white rounded-3xl outline-none text-sm"
              placeholder="email Address..."
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-3 relative">
            <label htmlFor="password" className="block text-black mb-2 text-sm">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder="***********"
              className="w-full bg-white rounded-3xl outline-none text-sm font-semibold p-2 px-3 items-center"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            <button
              className="absolute right-5 top-11 -translate-y-1/2 cursor-pointer"
              type="button"
              onClick={handleToggle}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaRegEye /> : <PiEyeClosedBold />}
            </button>
          </div>
          <div className="h-10">
          {/* Show generic login error */}
          {loginError && <p className="text-red-600 text-center mb-3 tracking-wide">{loginError}</p>}
</div>
          <div className="text-end">
            <Link href="/forgot-password">Forgot password?</Link>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center py-6">
            <button
              type="submit"
              className="p-1 px-8 bg-blue-600 text-white rounded-full hover:scale-105 hover:bg-blue-950 hover:text-white"
            >
              Login
            </button>
          </div>

          {/* Link to Register Page */}
          <div className="flex justify-center items-center">
            <h1 className="text-xs text-black">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 text-sm">
                Register
              </Link>{" "}
              instead
            </h1>
          </div>
        </form>
      </div>

      {/* Back Button */}
      <div className="justify-center items-center flex-col flex py-10 p-3 gap-5">
        <Link href="/">
          <button className="px-8 flex flex-row gap-2 items-center p-1 bg-blue-600 text-white rounded-3xl shadow-2xl hover:scale-105 hover:bg-gray-400 transition duration-150 cursor-pointer">
            <FaArrowLeftLong /> Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
