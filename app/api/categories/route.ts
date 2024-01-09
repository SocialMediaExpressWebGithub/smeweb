
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      // await prisma.
      const category_data = await prisma.category.findMany({select: {id:true,
        catName: true
      }});
      return NextResponse.json({status : 200, category_data : category_data})
    } catch (err) {
      return NextResponse.json({ status: 500, message: 'Internal server error' });
    }
  }
  else {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed' });
  }
}