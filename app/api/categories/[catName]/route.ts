import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function GET(req:NextRequest, {params} : {params :{ catName: string}}) {
  // console.log("category id", params.catName)
    if (req.method === 'GET') {
      const session = await getServerSession(authOptions)
      try {
        const catName = params.catName;
        const totalPage = await prisma.newsdetails.count({
          where: {
            catName: catName
          }
        });
        const newsByCat = await prisma.newsdetails.findMany({
          where : {catName : catName},
          take: 9,
          orderBy : { newsdatetime :"desc"}
        })
        // console.log(newsByCat)
        return NextResponse.json({ newslist: newsByCat, totalPage : totalPage }, {status : 200})
       
        } catch (err) {
          return NextResponse.json({message: 'Internal server error' }, { status: 500});
        }
      }
      else {
        return NextResponse.json({ status: 405, message: 'Method Not Allowed' }, { status: 405});
      }
};