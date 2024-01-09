"use client"

import { NewsType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// const getNewsData = async (): Promise<Record<string, Newsdetails[]>> => {

// }

export default async function HomePage() {
    const [latestNews, setLatestNews] = useState([]);
    const [politicsNews, setPolitics] = useState([]);
    const [sportsNews, setSportsNews] = useState([]);
    const [healthNews, setHealthNews] = useState([]);
    const [OthersNews, setOthersNews] = useState([]);
    const [entertainmentNews, setEntertainmentNews] = useState([]);


    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getnews`, { method: "GET", cache: "no-store" })
                if (res.status == 200) {
                    const dbres = await res.json();
                    // console.log(dbres)
                    setLatestNews(dbres.newslist.Latest)
                    setPolitics(dbres.newslist.Politics)
                    setSportsNews(dbres.newslist.Sports)
                    setHealthNews(dbres.newslist.Health)
                    setOthersNews(dbres.newslist.Others)
                    setEntertainmentNews(dbres.newslist.Entertainment)
                } else {
                    setLatestNews([])
                    setPolitics([])
                    setSportsNews([])
                    setHealthNews([])
                    setOthersNews([])
                    setEntertainmentNews([])
                }
            } catch (error) {
                console.log("getnews error:", error)
                return {}
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Latest */}
            {latestNews && latestNews.length > 0 ?
                (<>
                    <div className="lg:flex lg:flex-row p-3 mt-2">
                        <div className="lg:w-3/4 w-full flex flex-col ">
                        <p className="text-black text-2xl border-b-4 border-red-500 p-1 mb-0.5 italic">Latest News</p>
                                <div key={latestNews[0]["id"]} className="flex items-center justify-center mt-1">
                                    <Link href={`${process.env.NEXT_PUBLIC_URL}/view/${latestNews[0]["id"]}`}>
                                        <span>
                                            <Image className="" width={1000} height={700} src={latestNews[0]["imageUrl"]?.[0] ?? ''} alt={latestNews[0]["header"]} />
                                            <p className="text-center font-bold mt-1.5">{latestNews[0]["header"]}</p>
                                        </span>
                                    </Link>
                                </div>
                        </div>

                        &nbsp;
                        {latestNews && latestNews.length > 1 ?
                            <div className="scrollable-div lg:w-1/2 w-full flex flex-col">

                                {latestNews.slice(0, latestNews.length).map((news: NewsType) => (
                                    <div className="flex flex-col py-2 mb-0.5" key={news.id}>
                                        <Link href={`${process.env.NEXT_PUBLIC_URL}/view/${news.id}`}>
                                            <span>
                                                <div className="news-card p-1">
                                                    <div className="flex items-center justify-center">
                                                        <Image className="max-w-full max-h-full rounded-md" src={news.imageUrl[0]} alt="Your Image" height={200} width={500} />
                                                    </div>
                                                    <h5 className="card-title px-10">{news.header}</h5>
                                                    {/* <p className="card-description px-5 dark:text-gray-400 max-h-10 overflow-hidden text-sm">{news.content}</p> */}
                                                </div>
                                            </span>
                                        </Link>
                                    </div>
                                ))
                                }</div>
                            : null}


                    </div>
                </>)
                : null}



            {/* Politics politicsNews */}
            {politicsNews && politicsNews.length > 0 ?
                (<>
                    <div className="lg:flex lg:flex-row p-3 mt-2">
                        <div className="lg:w-3/4 w-full flex flex-col ">
                        <p className="text-black border-b-4 border-lime-400 p-1 mb-0.5 italic">Politics</p>
                                <div key={politicsNews[0]["id"]} className="flex items-center justify-center mt-1">
                                    <Link href={`${process.env.NEXT_PUBLIC_URL}/view/${politicsNews[0]["id"]}`}>
                                        <span>
                                            <Image className="" width={1000} height={700} src={politicsNews[0]["imageUrl"]?.[0] ?? ''} alt={politicsNews[0]["header"]} />
                                            <p className="text-center font-bold mt-1.5">{politicsNews[0]["header"]}</p>
                                        </span>
                                    </Link>
                                </div>
                        </div>

                        &nbsp;
                        {politicsNews && politicsNews.length > 1 ?
                            <div className="scrollable-div lg:w-1/2 w-full flex flex-col">

                                {politicsNews.slice(0, politicsNews.length).map((news: NewsType) => (
                                    <div className="flex flex-col py-2 mb-0.5" key={news.id}>
                                        <Link href={`${process.env.NEXT_PUBLIC_URL}/view/${news.id}`}>
                                            <span>
                                                <div className="news-card p-1">
                                                    <div className="flex items-center justify-center">
                                                        <Image className="max-w-full max-h-full rounded-md" src={news.imageUrl[0]} alt="Your Image" height={200} width={500} />
                                                    </div>
                                                    <h5 className="card-title px-10">{news.header}</h5>
                                                    {/* <p className="card-description px-5 dark:text-gray-400 max-h-10 overflow-hidden text-sm">{news.content}</p> */}
                                                </div>
                                            </span>
                                        </Link>
                                    </div>
                                ))
                                }</div>
                            : null}


                    </div>
                </>)
                : null}











        </div>
    );

}