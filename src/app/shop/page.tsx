// "use client"
// import { useSession } from "next-auth/react";
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"

// const Shop=()=> {

//  const { data: session, status } = useSession();
// const router = useRouter()

// useEffect(() => {
//   if  (status === "unauthenticated") {
//     router.push("/login");
//   }
// }, [status, router]);
// if (status === "loading") {
//   return <p>loading...</p>
// }

// if (!session) {
//   return null;
// }


//     return(
//        <main className="w-full min-h-screen relative p-10">
//         <Image
//         src="/nature3.jpg"
//         fill
//         alt="bacground"
//         className="-z-10"
    
//         />

//         <div className="w-full rounded-2xl  bg-gray-100 p-3 flex flex-col gap-13 shadow-xl">
//         <div className="rounded-2xl bg-gray-300 p-5">
//           <h1 className="text-center p-3 text-2xl text-black font-light">
//             <span className="font-semibold  text-3xl text-blue-600">
//               {" "}
//               Thanks {" "}
//             </span>
//             for Logging In!
//           </h1>
//           <p className="py-5 text-center text-gray-500 text-sm italic">
//           Thank you for logging in and helping test the project.
// Your support means a lot and helps ensure everything works smoothly.
// If you notice any issues or have suggestions, feel free to share!
//           </p>
//         </div>

//         <div className="justify-center items-center flex-col flex py-4 p-3 gap-5">
//           <Link href="/"><button className="px-8 flex flex-row gap-2 items-center p-1 bg-blue-600 text-white rounded-3xl shadow-2xl  hover:scale-105 hover:bg-gray-400 transition duration-150 cursor-pointer">
//           <FaArrowLeftLong />  Get Back 
//           </button></Link>
         
//         </div>
//       </div>
//        </main>
//     )
// }
// export default Shop



"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const Shop = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
  console.log("SESSION", session);
  console.log("STATUS", status);

  if (status === "unauthenticated") {
    router.push("/login");
  } else if (status === "authenticated") {
    if (session?.user?.role !== "admin") {
      console.log("NOT ADMIN", session?.user?.role);
      router.push("/");
    }
  }
}, [status, session, router]);
  if (status === "loading") return <p>Loading...</p>;
       
  return (
    <main className="w-full min-h-screen relative p-10">
      <Image
        src="/nature3.jpg"
        fill
        alt="background"
        className="-z-10 object-cover"
      />

      <div className="w-full rounded-2xl bg-gray-100 p-3 flex flex-col gap-13 shadow-xl">
        <div className="rounded-2xl bg-gray-300 p-5">
          <h1 className="text-center p-3 text-2xl text-black font-light">
            <span className="font-semibold text-3xl text-blue-600">Thanks</span> for Logging In!
          </h1>
          <p className="py-5 text-center text-gray-500 text-sm italic">
            Thank you for logging in and helping test the project.
            Your support means a lot and helps ensure everything works smoothly.
            If you notice any issues or have suggestions, feel free to share!
          </p>
        </div>

        <div className="justify-center items-center flex-col flex py-4 p-3 gap-5">
          <Link href="/">
            <button className="px-8 flex flex-row gap-2 items-center p-1 bg-blue-600 text-white rounded-3xl shadow-2xl hover:scale-105 hover:bg-gray-400 transition duration-150 cursor-pointer">
              <FaArrowLeftLong /> Get Back
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Shop;
