
import { EmailComp } from "@/components/EmailComp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { fullname, email, message, selectedService } = await req.json();

    let nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
        },
        secure: true,
    })
    // send email for user create and sign up
    var output = ''
    var subject = ''

    output = EmailComp(fullname, selectedService, message, email)
    subject = `Request for this services : ${selectedService}`


    const mailData = {
        from: email,
        to: email,
        subject: subject,
        html: output,
    }
    transporter.sendMail(mailData, function (err: any, info: any) {
        if (err) {
            console.log(err)
            return NextResponse.json({ status: 500, message: "Error occured in sending message." }, { status: 500 })
        }
    })
    return NextResponse.json({ status: 200, message: "Message Sent successfully." }, { status: 200 })



}
