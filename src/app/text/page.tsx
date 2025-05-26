"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Text =()=> {
 const { data: session, status } = useSession();
const router = useRouter()

useEffect(() => {
  if  (status === "unauthenticated") {
    router.push("/login");
  }
}, [status, router]);
if (status === "loading") {
  return <p>loading...</p>
}

if (!session) {
  return null;
}

    return (
       <main className="relative w-full min-h-screen flex flex-row">
       {/* left div */}

       
        <div className="hidden md:block h-screen min-w-[20%] bg-white overflow-y-scroll ">
        <h1 className="font-semibold my-4 mt-5 text-2xl text-center sticky top-0 bg-white p-3 shadow">Dash Board</h1>
          <div className="grid grid-cols-1 p-3 gap-4">
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">check out</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Reciept</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Sold cars</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">New cars</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Old cars</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Belgiun cars</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Used cars</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Number of cars</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Brands available</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Colors available</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Old price</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">New price</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Sport cars available</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Family cars available</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">Trucks available</div>
            <div className="bg-amber-100 p-2 w-full rounded-2xl ">SUV available</div>
          </div>
        </div>
        
        <div className="bg-amber-300 flex flex-1 h-screen"></div>
       </main>
    )
}
export default Text