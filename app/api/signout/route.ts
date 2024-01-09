import { signOut } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("ssss post")
    if (req.method === 'POST') {
        try {
            const res =  await signOut();
            console.log("singou tres", res)
            return NextResponse.json({ redirect: true }, {status : 200});
          } catch (error) {
            console.log("errr", error)
            return NextResponse.json({ redirect: false }, {status : 500});
          }
  }else {
    return NextResponse.json({ redirect : true,message: "Method not allowed.", status: 403 }, { status: 403 });
  }};
  