// "use client";
// import { register as serverAction } from "@/actions/user"; // Assuming this is the function handling the registration logic
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { useState } from "react";
// import { FaRegEye } from "react-icons/fa6";
// import { PiEyeClosedBold } from "react-icons/pi";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// // Zod schema for validation
// const registerSchema = z.object({
//   name: z.string().min(3, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(4, "Password must have at least 4 characters"),
// });

// type RegisterData = z.infer<typeof registerSchema>;

// const RegisterPage = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleToggle = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const { data: session } = useSession();
//   if (session?.user) {
//     redirect("/login");
//   }

//   // Initialize React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterData>({
//     resolver: zodResolver(registerSchema),
//   });

//   // Handle form submission
//   const onSubmit = (data: RegisterData) => {
//   serverAction(data); // this matches expected type

//   };

//   return (
//     <main className="w-full min-h-screen relative">
//       <Image
//         src="/nature2.jpg"
//         fill
//         alt="background"
//         style={{ objectFit: "cover" }}
//         className="-z-10"
//       />
//       {/* form div */}
//       <div className="justify-center items-center p-10">
//         <form
//           onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from React Hook Form
//           className="w-full max-w-md mx-auto bg-white/50 border-gray-200 p-10 py-4 backdrop-blur-lg rounded-2xl"
//         >
//           <h1 className="text-black text-center font-semibold p-5 text-xl">
//             Create Account
//           </h1>

//           <div className="mb-3">
//             <label htmlFor="name" className="text-black mb-4 text-sm">
//               Name:
//             </label>
//             <input
//               type="text"
//               placeholder="Emmanuel"
//               id="name"
//               {...register("name")} // Register with React Hook Form
//               className="text-xs outline-none bg-white p-2 px-4 w-full rounded-2xl font-semibold"
//             />
//             {errors.name ? (
//               <p className="text-red-500 text-xs h-3">{errors.name.message}</p>
//             ) : (
//               <p className="text-red-500 text-xs h-3"></p>
//             )}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="text-black mb-4 text-sm">
//               Email Address:
//             </label>
//             <input
//               type="email"
//               placeholder="chibueze@gmail.com"
//               id="email"
//               {...register("email")} // Register with React Hook Form
//               className="text-xs outline-none bg-white p-2 px-4 w-full rounded-2xl font-semibold"
//             />
//             {errors.email ? (
//               <p className="text-red-500 text-xs h-3">{errors.email.message}</p>
//             ) : (
//               <p className="text-red-500 text-xs h-3"></p>
//             )}
//           </div>

//           <div className="mb-3 relative">
//             <label htmlFor="password" className="block text-black mb-2 text-sm">
//               Password:
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               {...register("password")} // Register with React Hook Form
//               placeholder="***********"
//               className="w-full bg-white rounded-3xl outline-none text-sm font-semibold p-2 px-3 items-center"
//             />
//             {errors.password ? (
//               <p className="text-red-500 text-xs h-3">
//                 {errors.password.message}
//               </p>
//             ) : (
//               <p className="text-red-500 text-xs h-3"></p>
//             )}
//             <button
//               className="absolute right-5 top-11 -translate-y-1/2 cursor-pointer"
//               type="button"
//               onClick={handleToggle}
//             >
//               {showPassword ? <FaRegEye /> : <PiEyeClosedBold />}
//             </button>
//           </div>

//           <div className="justify-center items-center flex py-4 flex-col gap-3">
//             <button className="p-1 px-7 rounded-2xl bg-blue-600 hover:bg-blue-900 text-white hover:scale-105">
//               Create
//             </button>
//             <h1 className="text-xs">
//               Already have an account?{" "}
//               <Link href="/login" className="text-blue-600">
//                 Login
//               </Link>
//             </h1>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// };

// export default RegisterPage;


"use client";
import { register as serverAction } from "@/actions/user"; // Assuming this is the function handling the registration logic
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { PiEyeClosedBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Updated Zod schema to include confirmPassword
const registerSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must have at least 4 characters"),
    confirmPassword: z.string().min(4, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const { data: session } = useSession();
  if (session?.user) {
    redirect("/login");
  }

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  // Handle form submission
  const onSubmit = (data: RegisterData) => {
    serverAction(data); // this matches expected type
  };

  return (
    <main className="w-full min-h-screen relative">
      <Image
        src="/nature2.jpg"
        fill
        alt="background"
        style={{ objectFit: "cover" }}
        className="-z-10"
      />
      <div className="justify-center items-center p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md mx-auto bg-white/50 border-gray-200 p-10 py-4 backdrop-blur-lg rounded-2xl"
        >
          <h1 className="text-black text-center font-semibold p-5 text-xl">
            Create Account
          </h1>

          <div className="mb-3">
            <label htmlFor="name" className="text-black mb-4 text-sm">
              Name:
            </label>
            <input
              type="text"
              placeholder="Emmanuel"
              id="name"
              {...register("name")}
              className="text-xs outline-none bg-white p-2 px-4 w-full rounded-2xl font-semibold"
            />
            {errors.name ? (
              <p className="text-red-500 text-xs h-3">{errors.name.message}</p>
            ) : (
              <p className="text-red-500 text-xs h-3"></p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="text-black mb-4 text-sm">
              Email Address:
            </label>
            <input
              type="email"
              placeholder="chibueze@gmail.com"
              id="email"
              {...register("email")}
              className="text-xs outline-none bg-white p-2 px-4 w-full rounded-2xl font-semibold"
            />
            {errors.email ? (
              <p className="text-red-500 text-xs h-3">{errors.email.message}</p>
            ) : (
              <p className="text-red-500 text-xs h-3"></p>
            )}
          </div>

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
            {errors.password ? (
              <p className="text-red-500 text-xs h-3">{errors.password.message}</p>
            ) : (
              <p className="text-red-500 text-xs h-3"></p>
            )}
            <button
              className="absolute right-5 top-11 -translate-y-1/2 cursor-pointer"
              type="button"
              onClick={handleTogglePassword}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaRegEye /> : <PiEyeClosedBold />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-3 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-black mb-2 text-sm"
            >
              Confirm Password:
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword")}
              placeholder="***********"
              className="w-full bg-white rounded-3xl outline-none text-sm font-semibold p-2 px-3 items-center"
            />
            {errors.confirmPassword ? (
              <p className="text-red-500 text-xs h-3">
                {errors.confirmPassword.message}
              </p>
            ) : (
              <p className="text-red-500 text-xs h-3"></p>
            )}
            <button
              className="absolute right-5 top-11 -translate-y-1/2 cursor-pointer"
              type="button"
              onClick={handleToggleConfirmPassword}
              tabIndex={-1}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FaRegEye /> : <PiEyeClosedBold />}
            </button>
          </div>

          <div className="justify-center items-center flex py-4 flex-col gap-3">
            <button className="p-1 px-7 rounded-2xl bg-blue-600 hover:bg-blue-900 text-white hover:scale-105">
              Create
            </button>
            <h1 className="text-xs">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </h1>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
