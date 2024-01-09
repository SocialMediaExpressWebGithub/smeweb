"use client"
import Link from "next/link";
import { NewsType } from "@/types";
import Image from "next/image";
import formatDateToString from "@/utils";
import { Pagination } from "@nextui-org/pagination";
import CategoryBar from "@/components/Categories";
import { useEffect, useState } from "react";


export default function CategoriesNewsList({ params }: { params: { catname: string } }) {
    const [newslist, setNewslist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalpage, setTotalPage] = useState(0);
    const [catname, setCatName] = useState(params?.catname)


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories/${catname}`, { cache: "no-store" })
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

        if (catname) {
            fetchData();
        }
    }, [catname]);


    const handlePagination = async (page: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/page`, {
                method: "POST", cache: "no-store", headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ page, catname })

            })
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
            <CategoryBar />

            <div className="mt-3 mb-2">
                <span className=" mb-0.5 font-semibold">&nbsp;{params.catname}&nbsp; &nbsp; &nbsp;</span>
            </div>

            <div className="px-auto py-4 border-t">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                    {newslist && newslist?.length > 0 ? (
                        <>
                            {newslist?.map((news: NewsType) => (
                                <Link href={`${process.env.NEXT_PUBLIC_URL}/view/${news.id}`} key={news.id}>
                                    <div className="bg-white shadow-md shadow-zinc-700 p-4 rounded-md h-full">
                                        <div className="p-3">
                                            <h2 className="text-xl font-semibold mb-2">{news.header}</h2>
                                            <div className="mb-2 font-bold text-xs">{formatDateToString(news.newsdatetime)}</div>
                                            <div className="w-full h-72 relative">
                                                {news.imageUrl ? (
                                                    <>
                                                        <Image
                                                            className="object-cover rounded-md object-center border-r-2"
                                                            src={news.imageUrl[0]}
                                                            alt={news.header}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            placeholder="empty"
                                                            priority={false}
                                                        />
                                                    </>
                                                ) : (
                                                    <Image
                                                        className="rounded-md border-r-2"
                                                        src={"/newsthumbnail.jpg"}
                                                        alt={news.header}
                                                        fill
                                                    />
                                                )}
                                            </div>

                                            {/**Content div */}
                                            <div className="mb-2 max-h-20 overflow-hidden">
                                                <p className="font-normal mb-2 dark:text-gray-700 max-h-10 overflow-hidden text-sm">{news.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </>
                    ) : (
                        <div>No news to display.</div>
                    )}
                </div>




                {newslist && newslist?.length > 0 ? <div className="flex justify-center mt-3">
                    <Pagination style={{
                        border: '1px solid red', // Set the border color to red
                    }} classNames={{
                        wrapper: "gap-1 overflow-visible h-8 rounded border border-divider",
                        item: "w-8 h-8 text-small rounded-none bg-transparent ",
                        cursor:
                            "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                    }} size="lg" radius="md" color="primary" total={Math.abs(totalpage / 9) + 1} initialPage={1} onChange={handlePagination} />
                </div> : ""
                }

            </div>
        </>
    );



}