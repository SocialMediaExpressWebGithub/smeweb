"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SigninBtn(){
    
    const { data: session, status } = useSession();
    console.log("SigninBtn ", session)
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setShowModal(false);
          }
        };
    
        if (showModal) {
          document.addEventListener("click", handleClickOutside);
        } else {
          document.removeEventListener("click", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("click", handleClickOutside);
        }
      }, [showModal]);

    return (
        <div>
        {status === 'authenticated' ?
        <>
          <div>
          <Image className="rounded-full cursor-pointer" alt="Profile" src={session?.user?.image || ""} width={30} height={30} onClick={() => setShowModal(!showModal)} />
          </div>
          

          <div ref={modalRef} className={`absolute z-30 right-0 top-10 bg-white p-6 lg rounded-md flex-col gap-2 text-right min-w-[160px] ${showModal ? "flex" : "hidden"}`}>        

            <span className="font-bold">{session?.user?.name}</span>
            <Link onClick={()=> setShowModal(false)} className="hover:underline" href={"/admindashboard"}>All News</Link>
            <Link onClick={()=> setShowModal(false)} className="hover:underline" href={"/addpost"}>+ Add news</Link>

            <button onClick={() => signOut()} className="btn bg-amber-200" >Sign OUT</button>


          </div>
        </>

        : <div className="flex justify-evenly items-center space-x-4">
          <Link href={"/signin"} className="btn bg-amber-200" >Sign in</Link>
        </div>
      }
      </div>

    );
}