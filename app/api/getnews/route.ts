import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";
import { RecordType } from "@/types";
import { Newsdetails } from "@prisma/client";
import { Prosto_One } from "next/font/google";

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {

    const session = await getServerSession(authOptions)

    const news = await prisma.newsdetails.findMany({
      take: 10,
      orderBy : { newsdatetime :"desc"}
    });

    try {
      // get all the categories 
      // const categories = ['Latest', 'Politics', 'Sports', 'Health', 'Others', 'Entertainment']

  const latestNews = await prisma.newsdetails.findMany({   orderBy: { newsdatetime: 'desc' },
        take: 10});
    

      return NextResponse.json({
        status: 200,
        newslist: latestNews
      })

    } catch (err) {
      return NextResponse.json({ status: 500, message: 'Internal server error' });
    }
  }
  else {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed' });
  }
};


// try {
//   // get all the categories 
//   const categories = ['Latest', 'Politics', 'Sports', 'Health', 'Others', 'Entertainment']

//   const newsList: Record<string, Newsdetails[]> = {};
//   for (const names of categories) {
//     const latestNews = await prisma.newsdetails.findMany({
//       where: { catName: names },
//       orderBy: { newsdatetime: 'desc' },
//       take: 4,
//     });

//     newsList[names] = latestNews;
//   }

//   return NextResponse.json({
//     status: 200,
//     newslist: newsList
//   })

// } catch (err) {
//   return NextResponse.json({ status: 500, message: 'Internal server error' });
// }