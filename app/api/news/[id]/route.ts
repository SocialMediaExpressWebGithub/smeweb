import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function GET(req:NextRequest, {params} : {params :{ id: string}}) {
  if (req.method === 'GET') {
    const session = await getServerSession(authOptions)
    const sess_email = session?.user?.email;
    if (session) {
      if (sess_email && sess_email === process.env.NEXTAUTH_API_EMAIL) {
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
  }
  else {
    return NextResponse.json({ redirect: true, message: "Session is not active."}, { status: 401 });
  }
  } else {
    return NextResponse.json({ redirect: true, message: "Method not allowed."}, { status: 403 });
  }
};

export async function PUT(req:NextRequest, {params} : {params :{ id: string}}) {

  if (req.method === 'PUT') {
    const session = await getServerSession(authOptions)
    const sess_email = session?.user?.email;

    // Check if the session is true
    if (session) {
      if (sess_email === process.env.NEXTAUTH_API_EMAIL) {
        // get data
        const { header, content, imageUrl, publicId, eventplace, source, socialmedialinks, newsdatetime, catName : selectedCategory, passcode } = await req.json();
        // Check if the passcode is provided and matches "passcode"
        if (passcode && passcode === process.env.NEXTAUTH_API_SECRET) {
          try {
            const parsedDateTime = new Date(newsdatetime);
            const isoDate = parsedDateTime.toISOString();

            const id = params.id;
            const updatenews = await prisma.newsdetails.update({
                where :{id},
                data:{
                    header,
                    content,
                    imageUrl,
                    publicId,
                    eventplace,
                    source,
                    socialmedialinks,
                    newsdatetime :isoDate,
                    catName : selectedCategory,
                    authorEmail : sess_email
                  }
            })

            if(updatenews){
              return NextResponse.json({ message: "Updated" },{status: 200} )
            }else{
              return NextResponse.json({newslist: [] }, {status: 400})
            }
           
          } catch (error) {
            // console.log("updated error", error)
            return NextResponse.json({ message: "News cannot insert. Error occured." }, { status: 500 })
          }
        } else {
          return NextResponse.json({ message: "Passcode not provided or doesn't match." }, { status: 400 });
        }
      } else {
        return NextResponse.json({ message: "Session not authorized or email doesn't match." }, { status: 403 });
      }
    } else {
      return NextResponse.json({ message: "Session is not active." }, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed." }, { status: 404 });
  }
};

export async function DELETE(req:NextRequest, {params} : {params :{ id: string}}) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(authOptions)
    const sess_email = session?.user?.email;
    if (session) {
      if (sess_email && sess_email === process.env.NEXTAUTH_API_EMAIL) {
        // var authorEmail = session?.user?.email
        const id = params.id;
        const deletenews = await prisma.newsdetails.delete({where :{id}})
        
        if(deletenews){
          return NextResponse.json({ newslist: "deleted." },{status: 200} )
        }else{
          return NextResponse.json({newslist: [] }, {status: 400})
        }

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
