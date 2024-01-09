import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminBar() {

    return (
        <div>
            <div className="flex place-content-end gap-1 font-semibold text-slate-950 flex-wrapborder-b-4 border-t-4 top-2 border-b-4 bottom-2 ">

                <Link className="px-1.5 py-1.5 rounded-md cursor-pointer " href={`${process.env.NEXT_PUBLIC_URL}/addnews`}><span className="hover:underline">Add News</span></Link>
                <Link className="px-1.5 py-1.5 rounded-md cursor-pointer " href={`${process.env.NEXT_PUBLIC_URL}/admindashboard`}><span className="hover:underline">All News</span></Link>
                <button onClick={() => signOut()} >SignOut</button>

            </div>

        </div>
    );
}