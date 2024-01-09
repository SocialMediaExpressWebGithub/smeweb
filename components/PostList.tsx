import { NewsType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaHandRock } from "react-icons/fa";



export default function PostList({ id,header,content,imageUrl,publicId,eventplace, source, socialmedialinks ,newsdatetime, catName, newslist, authorEmail  }: NewsType) {
    
    const isLikeable = true;

    console.log("newsdate ", newsdatetime)
    
    return (
        <div className="border-b border-b-300 py-3" key={id}>
            
            <h2 className="text-2xl font-bold my-1">{header}</h2>
            <div className="w-full h-72 relative">
                {imageUrl ? <>
                    <Image className="object cover rounded-md object-center border-r-2" src={imageUrl[0]} alt={header} fill />
                </> : <Image className="rounded-md border-r-2" src={"/newsthumbnail.jpg"} alt={header} fill />}
            </div>
            {catName && <Link className="text-sm font-extrabold mt-3 block" href={`category/${catName}`}>{catName}</Link>}
            
            {/**Content div */}
            <div className="mb-2">
            <p className="leading-lose">
                {content}
            </p>
                Posted on :<span className="font-bold">{newsdatetime}</span>  
            </div>
            {socialmedialinks && (
                <div className="flex flex-col gap-1"> {socialmedialinks.map((link,i)=> (<div key={i} className="flex gap-2 items-center"><Link className="text-[#7563DF] max-w-full overflow-hidden text-ellipsis" href={`${link}`}>{link}</Link> </div>))}</div>
            )}

            {
                isLikeable && (
                    <div> <Link href={'/like'}>  <FaHandRock /></Link>
                        </div>
                )
            }

           
            
            

            
        </div>
    );
}