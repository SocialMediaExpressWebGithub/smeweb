
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import PostForm from "@/components/PostForm";

export default async function AddPost() {

    const insession = await getServerSession(authOptions);
    if(!insession){
        redirect("/signin")
    }
    
    return (
        <>
        <PostForm/>
        </>
      
    )
}