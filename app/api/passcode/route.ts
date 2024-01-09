import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
      return NextResponse.json({ status: 405, message: 'Method Not Allowed' });
    }
  
    const session = await getServerSession(authOptions);
    const { passcode } = await req.json();
  
    if (session && session.user?.email === process.env.NEXTAUTH_API_EMAIL) {
      if (passcode === process.env.NEXTAUTH_API_SECRET) {
        return NextResponse.json({ status: 200, message: 'passcode_accepted' }, {status: 200});
      } else {
        return NextResponse.json({ status: 400, error_message: 'passcode_denied and un-authorized' }, {status: 400});
      }
    }
  
    if (passcode === process.env.NEXTAUTH_API_SECRET) {
      return NextResponse.json({ status: 200, message: 'passcode_accepted and authorized' }, {status: 200});
    }
  
    return NextResponse.json({ status: 400, error_message: 'passcode_denied no session' }, {status: 400});
  }
  
  