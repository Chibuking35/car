"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    // Run once on mount
    handleResize();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => setIsOpen((prev) => !prev);

  const { data: session } = useSession();
  

  const router = useRouter();

  const handleAuthToggle = () => {
    if (session) {
      signOut();
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="w-full h-[20%] bg-slate-200 justify-between items-center flex ">
      <div className="p-1">
        <Link href="/">
          <div className="flex flex-row gap-2 p-1 sm:px-2 lg:px-4">
            <Image
              src="/menu.png"
              width={20}
              height={5}
              alt="logo"
              className="rotate-90"
            />
            <h1>Chibenz</h1>
          </div>
        </Link>
      </div>
      <div className="flex flex-row">
        <div className="lg:px-8 px-3 hidden md:block">
          {session && (
            <Link href="/users" className="mr-2 font-sans ">
              users
            </Link>
          )}
          {session && (
            <Link href="/contact" className="mr-2 font-sans ">
              Contact
            </Link>
          )}
          {session && (
            <Link href="/text" className="mr-2 font-sans ">
              Text
            </Link>
          )}
          {session && (
            <Link href="/about" className="mr-2 font-sans ">
              About
            </Link>
          )}
          {session && (
            <Link href="/cars" className="mr-2 font-sans ">
              Cars
            </Link>
          )}
          {session && (
            <button
              onClick={handleAuthToggle}
              className="px-4 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 text-sm p-1 "
            >
              Logout
            </button>
          )}
        </div>

        <div>
          {session && (
            <button
              onClick={handleClick}
              className="md:hidden p-3 cursor-pointer"
            >
              {isOpen ? <MdOutlineCancel size={25} /> : <IoMdMenu size={25} />}
            </button>
          )}
        </div>

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute md:hidden rounded-b-md bg-white/50 backdrop-blur-lg flex flex-col right-0 top-12 z-10 w-1/2  h-1/2 justify-center items-center
            gap-5 p-5"
          >
            {session && (
              <div className="borde-b-2 w-full text-center cursor-pointer">
                <Link href="/contact" className="mr-2 font-sans ">
                  Contact
                </Link>
              </div>
            )}
            {session && (
              <div className="borde-b-2 w-full text-center cursor-pointer">
                <Link href="/about" className="mr-2 font-sans ">
                  About
                </Link>
              </div>
            )}
            {session && (
              <div className="borde-b-2 w-full text-center cursor-pointer ">
                <Link href="/cars" className="mr-2 font-sans ">
                  Cars
                </Link>
              </div>
            )}
            {session && (
              <button
                onClick={handleAuthToggle}
                className="px-4 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 text-sm p-1 "
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};
export default Navbar;
