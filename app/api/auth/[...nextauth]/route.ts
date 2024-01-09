import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";

export const authOptions : AuthOptions= {
    adapter: PrismaAdapter(prisma),
    providers : [
        GoogleProvider({
            clientId: process.env.NEXTAUTH_GOOGLEID as string,
            clientSecret:process.env.NEXTAUTH_GOOGLESECRET as string
        })

    ],
    pages:{
        signIn: '/signin',
    },
    secret : process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(authOptions);


export {handler as GET , handler as POST};
