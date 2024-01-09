"use client"
import { useState, useEffect } from "react";
import { NewsType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getnews`, { method: "GET", cache: "no-store" })
                if (res.status === 200) {
                    const dbres = await res.json();
                    setLatestNews(dbres.newslist || []);
                } else {
                    setLatestNews([]);
                }
            } catch (error) {
                console.log("getnews error:", error);
                setLatestNews([]);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {latestNews && latestNews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 mt-3 rounded-md">
                    {latestNews.map((news: NewsType) => (
                        <div key={news.id} className="shadow-sm shadow-zinc-700 transition-colors hover:bg-neel-100 rounded-md">
                            <Link href={`${process.env.NEXT_PUBLIC_URL}/view/${news.id}`}>
                                <p className="font-extrabold text-base md:text-xl lg:text-2xl xl:text-3xl mb-1 italic mt-1.5 justify-right text-slate-800 overflow-hidden truncate w-50">
                                    {news.header}
                                </p>
                                <div className="shadow-sm transition-transform hover:scale-105">
                                    <Image width={1000} height={700} src={news.imageUrl[0]} alt="asd" />
                                </div>
                                <div className="m-4">
                                    <p className="leading-relaxed text-sm md:text-base lg:text-lg xl:text-lg text-slate-950 overflow-hidden line-clamp-4">
                                        {news.content}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
}
