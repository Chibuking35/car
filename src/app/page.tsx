"use client"

import { MoveRight } from "lucide";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {


  return (
    <main className="w-full h-fit p-4 px-7 relative ">
      
      <Image
        src="/nature.jpg"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        className="-z-10"
      />
      <div className="w-full rounded-2xl  bg-gray-100/50 p-3 flex flex-col gap-13 shadow-xl backdrop-blur-sm mt-10">
        <div className="rounded-2xl bg-gray-300 p-5">
          <h1 className="text-center p-3 text-2xl text-black font-light">
            <span className="font-semibold  text-3xl text-blue-600">
              {" "}
              Welcome{" "}
            </span>
            to my first Auth.js project
          </h1>
          <p className="py-5 text-center text-gray-500 text-sm italic">
            Please login so that I can properly test-run my project, check all
            the features, and make sure everything is working smoothly without
            any issues.
          </p>
        </div>

        <div className="justify-center items-center flex-col flex py-4 p-3 gap-5">
          <Link href="/login"><button className="px-8 flex flex-row gap-2 items-center p-1 bg-blue-600 text-white rounded-3xl shadow-2xl  hover:scale-105 hover:bg-gray-400 transition duration-150 cursor-pointer">
            Get started <FaArrowRightLong />
          </button></Link>
         
        </div>
      </div>


      <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 p-10">
        <div className="bg-gray-100 flex flex-col gap-3 rounded-2xl p-4 shadow-xl">
          <h1 className="p-2 text-sm font-semibold bg-gray-300 rounded-2xl text-gray-500">
            Email Sign-in
          </h1>
          <p className="text-xs text-justify text-gray-500">
            {" "}
            enables passwordless login by sending a magic link to the user's
            email. The user simply clicks the link to authenticate, providing a
            seamless and secure experience without the need to remember
            passwords.
          </p>
        </div>
        <div className="bg-gray-100 flex flex-col gap-3 rounded-2xl p-4 shadow-xl">
          <h1 className="p-2 text-xs font-semibold bg-gray-300 rounded-2xl text-gray-500 whitespace-nowrap">
            JWT Authentication (JSON Web Token)
          </h1>
          <p className="text-xs text-justify text-gray-500">
            {" "}
            This is a secure, stateless method for managing user sessions. It
            involves generating a token after the user logs in, which is then
            used for authentication in subsequent requests. This method is
            highly scalable, as it doesn't rely on server-side sessions and can
            be used across multiple devices and servers.
          </p>
        </div>
        <div className="bg-gray-100 flex flex-col gap-3 rounded-2xl p-4 shadow-xl">
          <h1 className="p-2 text-sm font-semibold bg-gray-300 rounded-2xl text-gray-500">
            Custom Authentication
          </h1>
          <p className="text-xs text-justify text-gray-500">
            {" "}
            This allows you to define your own login flow, such as using a
            username and password combination or integrating with an external
            authentication system. It offers maximum flexibility for
            applications with specific user authentication needs.
          </p>
        </div>
        <div className="bg-gray-100 flex flex-col gap-3 rounded-2xl p-4 shadow-xl">
          <h1 className="p-2 text-sm font-semibold bg-gray-300 rounded-2xl text-gray-500">
            OAuth Providers
          </h1>
          <p className="text-xs text-justify text-gray-500">
            {" "}
            This allow users to log in through third-party platforms like
            Google, GitHub, Facebook, and others. This simplifies the
            authentication process, as users don’t need to create a new account
            but can instead use their existing credentials from trusted
            services. It also improves security by relying on well-established
            authentication providers.
          </p>
        </div>
      </div>
    </main>
  );
};
export default Home;
