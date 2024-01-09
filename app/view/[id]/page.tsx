import ImageViewer from "@/components/ImageViewer";
import { NewsType } from "@/types";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import formatDateToString from "@/utils";
import CategoryBar from "@/components/Categories";

const getNewsData = async (id: string): Promise<NewsType | null> => {
  try {
    const db_res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/viewnews/${id}`, { method: "GET", headers: Object.fromEntries(headers()) })

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

export default async function ViewNews({ params }: { params: { id: string } }) {
  const viewdata = await getNewsData(params.id);

  if (viewdata === null) {
    return (
      <div>
        No news available. Check on{" "}
        <Link href={`${process.env.NEXT_PUBLIC_URL}`} passHref>
          <a className="hover:underline font-semibold text-2xl">Homepage</a>
        </Link>
      </div>
    );
  }

  return (
    <>
      <CategoryBar />
      <div className="py-3 px-3 border-b border-gray-300 rounded-md shadow-md border mt-1" key={viewdata.id}>

        <h2 className="text-3xl font-bold font-sans-serif text-center">{viewdata.header}</h2>

        <span className="text-sm font-bold p-3 mx-5 block text-center">
          {formatDateToString(viewdata.newsdatetime)}
        </span>

        <div className="image-container mx-auto">
          {viewdata.imageUrl ? (
            <ImageViewer imagearr={viewdata.imageUrl} />
          ) : (
            <Image className="rounded-md border-r-2" src="/newsthumbnail.jpg" alt={viewdata.header} fill />
          )}
        </div>

        <div className="p-3 mx-5">
          <p className="leading-relaxed text-gray-700 text-xl ">
            {viewdata.content}
            {/* Your content here */}
          </p>
          <div className="flex flex-col gap-1 mt-1 mb-2">
            {viewdata.socialmedialinks && (
              <div>
                {viewdata.socialmedialinks.map((link, id) => (
                  <div key={id} className="flex gap-2 items-center">
                    <a className="text-[#7563DF] max-w-full overflow-hidden text-ellipsis" href={link}>
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="italic text-center">Share on:</p>
          <div className="flex justify-center gap-3 mt-2">
            <a href={`whatsapp://send?text=${process.env.NEXT_PUBLIC_URL}/view/${viewdata.id}`}>
              <BsWhatsapp style={{ fontSize: '1.5rem', color: "#00ff00" }} />
            </a>
            <a href={`https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_URL}/view/${viewdata.id}`}>
              <BsFacebook style={{ fontSize: '1.5rem', color: "#0866ff" }} />
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${process.env.NEXT_PUBLIC_URL}/view/${viewdata.id}`}>
              <FaSquareXTwitter style={{ fontSize: '1.5rem' }} />
            </a>
            <a href={`https://www.instagram.com?u=${process.env.NEXT_PUBLIC_URL}/view/${viewdata.id}`}>
              <BsInstagram style={{ fontSize: '1.5rem', color: "#dd7a62" }} />
            </a>
            <a href={`https://t.me/share/url?url=${process.env.NEXT_PUBLIC_URL}/view/${viewdata.id}`}>
              <BsTelegram style={{ fontSize: '1.5rem', color: "#82c7ff" }} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
