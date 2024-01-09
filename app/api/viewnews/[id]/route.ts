import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function GET(req:NextRequest, {params} : {params :{ id: string}}) {
  if (req.method === 'GET') {
        const id = params.id;
        const data = await prisma.newsdetails.findUnique({where : {id}})
        if(data){
          return NextResponse.json({ newslist: data },{status: 200} )
        }else{
          return NextResponse.json({newslist: [] }, {status: 400})
        }

    } else {
      return NextResponse.json({ redirect: true, message: "Session not authorized.Email doesn't match."}, { status: 400 });
    }
};