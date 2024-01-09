import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';




export default async function EditPost({params} : {params : {id : string}}){
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/signin")
    }
    if(params.id){
        const db_res = await fetch(`${process.env.NEXTAUTH_URL}/api/news/id=${params.id}`, { method: "DELETE", headers: Object.fromEntries(headers()) })
        if(db_res.ok){
            redirect("/admindashboard");
        }
    }


    
    
    
    return (<>Deleting...</>)
}