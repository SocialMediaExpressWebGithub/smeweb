import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    // get data
    const { page, catname } = await req.json();
    if (page && catname) {
      try {
        const totalItems = await prisma.newsdetails.count({ where: { catName: catname } });
        const skip = (page - 1) * 9;
        const newsByCat = await prisma.newsdetails.findMany({
          where: { catName: catname },
          orderBy: { newsdatetime: "desc" },
          take: 9,
          skip: skip
        });
        return NextResponse.json({ newslist: newsByCat, totalPage: totalItems }, { status: 200 })
      } catch (error) {
        return NextResponse.json({ message: "Internal server error.", status: 500 }, { status: 500 })
      }

    } else if (page && catname == undefined) {
      const totalItems = await prisma.newsdetails.count();
      const skip = (page - 1) * 9;
      const newsByCat = await prisma.newsdetails.findMany({
        orderBy: { newsdatetime: "desc" },
        take: 9,
        skip: skip
      });
      return NextResponse.json({ newslist: newsByCat, totalPage: totalItems }, { status: 200 })
    }else{
      return NextResponse.json({ message:"something went wrong in pagination" }, { status: 404 })
    }
  } else {
    return NextResponse.json({ message: "Method not allowed." }, { status: 404 });
  }
};
