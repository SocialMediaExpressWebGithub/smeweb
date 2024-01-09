"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { NewsType } from "@/types";
import Image from "next/image";
import formatDateToString from "@/utils";
import DeleteButton from "./DeleteButton";
import { Pagination } from "@nextui-org/pagination";
import AdminBar from "./AdminBar";

export default function AdminClient({ email, header }: {
    email: string | null | undefined, header: {}
}) {
    const [newslist, setNewslist] = useState([]);
    const [isEditable, setIsEditable] = useState(email);
    const [totalpage, setTotalPage] = useState(0);
    const [newsEmail, setNewsEmail] = useState("");


    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news`, {
                    method: "GET",
                    cache: "no-cache",
                    headers: header
                });

                if (res.ok) {
                    const dbres = await res.json();
                    setNewslist(dbres?.newslist);
                    setTotalPage(dbres?.totalpage);
                    const firstObject = dbres?.newslist[0];
                    setNewsEmail(firstObject.authorEmail)
                } else {
                    setNewslist([]);
                }
            } catch (error) {
                console.log("getnews error:", error);
                setNewslist([]);
            }
        };

        fetchData();
    }, []);



    const handlePagination = async (page: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/page`, {
                method: "POST", cache: "no-store", headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ page })
            })
            console.log("res:", res)
            if (res.status === 200) {
                const { newslist, totalPage } = await res.json();
                setNewslist(newslist);
                setTotalPage(totalPage)
            } else {
                setNewslist([])
            }
        }
        catch (error) {
            console.log("Error in fetching category data list.")
            return null
        }
    }

    return (
        <>
            <AdminBar />

            <p className='px-3 mt-1 font-bold underline'>Admin Dashboard</p>

            {newslist && newslist?.length > 0 ? <>
                {newslist?.map((news: NewsType) => <div className="border-b border-b-300 py-3" key={news.id}>
                    <div className="p-3">
                        <h2 className="font-bold my-1 text-sm">{news.header}</h2>
                        <div className="w-full h-72 relative">
                            {news.imageUrl ? <>
                                <Image className="object cover rounded-md object-center border-r-2" src={news.imageUrl[0]} alt={news.header} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    placeholder="empty"
                                    priority={false} />
                            </> : <Image className="rounded-md border-r-2" src={"/newsthumbnail.jpg"} alt={news.header} fill />}
                        </div>
                        {news.catName && <Link className="text-sm font-extrabold mt-3 block" href={`${process.env.NEXT_PUBLIC_URL}/category/${news.catName}`}>{news.catName}</Link>}
                        {/**Content div */}
                        <div className="mb-2 max-h-20 overflow-hidden text-sm">
                            <p className="leading-lose">
                                {news.content}
                            </p>
                            Posted on :<span className="font-bold"> {formatDateToString(news.newsdatetime)}</span>
                        </div>

                        {news.socialmedialinks && (
                            <div className="flex flex-col gap-1"> {news.socialmedialinks.map((link, i) => (<div key={i} className="flex gap-2 items-center"><Link className="text-[#7563DF] max-w-full overflow-hidden text-ellipsis" href={`${link}`}>{link}</Link> </div>))}</div>
                        )}

                        {
                            isEditable && isEditable == news.authorEmail ? < div >
                                <Link className='btn bg-green-500' href={`${process.env.NEXT_PUBLIC_URL}/editnews/${news.id}`}>Edit</Link>&nbsp;
                                <DeleteButton id={news.id} />
                            </div> : null
                        }
                    </div>
                </div>)}
                {newslist && <div className="flex justify-center mt-3">
                    <Pagination style={{
                        border: '1px solid red', // Set the border color to red
                    }} classNames={{
                        wrapper: "gap-1 overflow-visible h-8 rounded border border-divider",
                        item: "w-8 h-8 text-small rounded-none bg-transparent ",
                        cursor:
                            "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                    }} size="lg" radius="md" color="primary" total={Math.abs(totalpage / 9) + 1} initialPage={1} onChange={handlePagination} />
                </div>
                }
            </> : <div>No news to display.</div>}


        </>

    );
}