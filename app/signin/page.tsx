import SignInComp from "@/components/Signincomp";
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

export default async function Signin(){
    const session = await getServerSession(authOptions);
    // console.log("sesss :", session)
    if(session){
        redirect("/admindashboard")
    }

    return(
        <>
        <SignInComp/>
        
        </>
    );
}