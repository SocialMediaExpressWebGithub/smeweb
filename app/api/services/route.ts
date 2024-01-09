
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      // await prisma.
      const services_data = await prisma.services.findMany({select: {id:true,
        servicesname: true
      }});
      return NextResponse.json({status : 200, services_data : services_data},{status : 200})
    } catch (err) {
      return NextResponse.json({ status: 500, message: 'Internal server error' },{status : 500});
    }
  }
  else {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed' },{status : 405});
  }
}