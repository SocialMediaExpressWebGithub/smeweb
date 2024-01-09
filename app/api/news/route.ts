import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"
import prisma from '@/lib/prismadb';
import { signOut } from 'next-auth/react';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const session = await getServerSession(authOptions)
    const sess_email = session?.user?.email as string;

    // Check if the session is true
    if (session) {
      if (sess_email === process.env.NEXTAUTH_API_EMAIL) {
        // get data
        const { header, content, imageUrl, publicId, eventplace, source, socialmedialinks, newsdatetime, catName, passcode } = await req.json();
        // Check if the passcode is provided and matches "passcode"
        if (passcode && passcode === process.env.NEXTAUTH_API_SECRET) {
          try {
            const parsedDateTime = new Date(newsdatetime);
            const isoDate = parsedDateTime.toISOString();

            const createNews = await prisma.newsdetails.create({
              data: {
                header,
                content,
                imageUrl,
                publicId,
                eventplace,
                source,
                socialmedialinks,
                newsdatetime: isoDate,
                catName,
                authorEmail: sess_email
              }
            });
            
            return NextResponse.json({ status: 200, redirect: true, message: "News inserted succesfully." }, { status: 200 })
          } catch (error) {
            // console.log("insert error", error)
            return NextResponse.json({ message: "News cannot insert. Error occured." ,status: 500}, { status: 500 })
          }
        } else {
          return NextResponse.json({ message: "Passcode not provided or doesn't match.",status: 400 }, { status: 400 });
        }
      } else {
        return NextResponse.json({ message: "Session not authorized or email doesn't match.",status: 403 }, { status: 403 });
      }
    } else {
      return NextResponse.json({ message: "Session is not active.",status: 401 }, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed." }, { status: 404 });
  }
};


export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    const session = await getServerSession(authOptions)
    const sess_email = session?.user?.email;
    if (session) {
      if (sess_email && sess_email === process.env.NEXTAUTH_API_EMAIL) {
        const totalpage = await prisma.newsdetails.count();
      const newslist = await prisma.newsdetails.findMany({
        orderBy: { newsdatetime: "desc" },
        take: 10,
        skip:0, 
        select: {
          id: true,
          header: true,
          newsdatetime: true,
          content: true,
          imageUrl: true,
          publicId: true,
          catName: true,
          authorEmail: true
        }
      });

      return NextResponse.json({
        status: 200,
        newslist: newslist,
        totalpage : totalpage
      }, { status: 200 })

    } else {
      return NextResponse.json({ redirect: true, message: "Session not authorized.Email doesn't match."}, { status: 400 });
    }
  }
  else {
    return NextResponse.json({ redirect: true, message: "Session is not active."}, { status: 401 });
  }
  } else {
    return NextResponse.json({ redirect: true, message: "Method not allowed."}, { status: 403 });
  }
};
