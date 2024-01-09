import { NewsType } from '@/types';
import { headers } from "next/headers";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AdminClient from '@/components/AdminClient';

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/signin");
    }

   const header = Object.fromEntries(headers())
   const email = session.user?.email
    return (
    <AdminClient email={email} header={header}/>
    )
}

