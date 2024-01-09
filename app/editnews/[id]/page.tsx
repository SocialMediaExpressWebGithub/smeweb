import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditComp from "@/components/EditComp";
import { NewsType } from "@/types";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import toast from "react-hot-toast";

const getNewsData = async (id: string): Promise<NewsType | null> => {
    try {
        const db_res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news/${id}`, { method: "GET", headers: Object.fromEntries(headers()) })

        if (db_res.ok) {
            const { newslist } = await db_res.json();
            return newslist || null;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function EditPost({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        toast.error("Unauthorized!");
        return redirect("/signin"); // Return the redirect result
    }

    const editdata = await getNewsData(params.id);
    const sess_email = session?.user?.email
    const newsEmail = editdata?.authorEmail

    if (editdata === null) {
        return <div>Invalid ID</div>;
    }

    return <EditComp newsData={editdata} session={sess_email} email={newsEmail}/>;
}
