"use client"
import { CategoryType } from "@/types";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineLink } from 'react-icons/ai';
import { BsImageFill } from "react-icons/bs"

import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import toast from "react-hot-toast";
import AdminBar from "./AdminBar";

export default function PostForm() {
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");

    const [imageUrlStr, setImageUrlStr] = useState("");
    const [publicIdStr, setPublicIdStr] = useState("");

    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const [publicId, setPublicId] = useState<string[]>([]);
    const [eventplace, setEventplace] = useState("");
    const [source, setSource] = useState("");
    const [socialmedialinks, setSocialmedialinks] = useState<string[]>([]);
    const [newsdatetime, setNewsdatetime] = useState("");
    const [categories, setCatgories] = useState<CategoryType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [links, setLinks] = useState("");

    const [passcode, setPasscode] = useState("");

    const [inputError, setInputError] = useState(false);
    const [resmsg, setResMsg] = useState("");
    const [resmsgStatus, setResmsgStatus] = useState(false);

    const router = useRouter();


    //useeffect
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, { method: "GET" });
            const in_catNames = await res.json();
            setCatgories(in_catNames?.category_data)
        };

        fetchCategories();
    }, []);


    // links
    const addLinks = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (links.trim() !== "") {
            let in_links = ""
            if (!links.startsWith("http://") && !links.startsWith("https://")) {
                in_links = "https://" + links;
            } else {
                in_links = links
            }
            setSocialmedialinks((prev) => [...prev, in_links])
            toast.success("link added");
            setLinks("");
        }
    }

    //delete links
    const deleteLink = (index: number) => {
        toast.success("link removed.")
        setSocialmedialinks((prev) => prev.filter((_, i) => i !== index));
    }

    // handle submit 
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setInputError(false)
        setResmsgStatus(false);

        if (!header || !content || !eventplace || !eventplace || !newsdatetime) {
            setInputError(true);
            toast.error("All the fields are required.")
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ header, content, eventplace, source, newsdatetime, imageUrl, catName: selectedCategory, socialmedialinks, passcode })
            });
            const db_res = await res.json();

            setResmsgStatus(true);
            setResMsg(db_res.message)
            console.log(db_res.status)
            if (db_res.status == 200 && db_res.redirect == true) {
                toast.success("News inserted succesfully.Redirecting to dashboard.")
                router.push("/admindashboard");
            } if (db_res.status === 400 || db_res.status == 401 || db_res.status === 403) {
                toast.error("Unauthorized! Sign out.")
                return signOut();

            }
        } catch (error) {
            toast.error("Error in adding news.")
            console.log(error)
            return;
        }
    }

    const handleUpload = (result: CldUploadWidgetResults) => {
        // get info 
        const info = result.info as Object;

        if ("secure_url" in info && "public_id" in info) {
            const url = info.secure_url as string;
            const public_id = info.public_id as string;
            setImageUrl((prev) => [...prev, url])
            setPublicId((prev) => [...prev, public_id])
            console.log(imageUrl)
            toast.success("Image uploaded.")
        }

    }

    const deleteImage = async (publicId : string, in_index :  number) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/removeimg`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicId })
            });

            if (res.ok) {
                setPublicId((prev) => prev.filter((_, i) => i !== in_index));
                setImageUrl((prev) => prev.filter((_, i) => i !== in_index));
                toast.success("image removed.")
            }

        } catch (error) {
            toast.error("Image delete error.")
            console.log(error);
        }

    }    

    return (
        <> <AdminBar />
            <div className="border-b border-b-300 py-3 px-3 border rounded-md shadow-md border-gray-200 mt-1" >

                <h3 className="text-xl font-bold py-2">Add news details</h3>

                {inputError ? <p className="p-2 text-red-500 font-bold">Header, contents, source, newsdate are required</p> : ""}

                {resmsgStatus ? <p className="p-2 text-red-500 font-bold">{resmsg}</p> : ""}

                {/* <div > */}
                <form className="flex flex-col gap-3">
                    <input type="text" placeholder="News header" value={header} onChange={(e) => setHeader(e.target.value)} />
                    <textarea className="px-4 py-3 h-36" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write the news description" />
                    <input type="text" placeholder="Event place" value={eventplace} onChange={(e) => setEventplace(e.target.value)} />
                    <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />


                    <input
                        className="date leading-tight focus:outline-none focus:shadow-outline"
                        id="news-date"
                        type="datetime-local"
                        placeholder="Select news date and time"
                        value={newsdatetime}
                        onChange={(e) => setNewsdatetime(e.target.value)}
                    />

                   


                    <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_API_PRESET}
                        onUpload={handleUpload}>
                        <div className="flex flex-col border-3 h-32 border-dotted justify-center place-items-center bg-slate-400 rounded-md relative" title="Upload"> <BsImageFill></BsImageFill> Upload Images
                        </div>
                    </CldUploadButton>
                    <div className="flex flex-col overflow-hidden text-ellipsis" >
                        {publicId && publicId.map((item, i) =>
                            <div className="flex items-center gap-1" key={i}>
                                <AiOutlineLink />
                                <Link className="text-blue-500 hover:underline overflow-hidden text-ellipsis" href={item}>{item}
                                </Link>
                                <span className="cursor-pointer" onClick={(e) => {e.preventDefault(); 
                                    deleteImage(item, i)}}><AiFillDelete /></span>
                            </div>
                        )}
                    </div>

                    <select title="select" className="select" onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Select news category</option>
                        {categories && categories.map((category: CategoryType) => (
                            <option key={category.id} value={category.catName} >{category.catName}
                            </option>
                        ))}
                    </select>

                    <div className="flex flex-col ">
                        {socialmedialinks && socialmedialinks.map((link, i) =>
                            <div className="flex items-center gap-1" key={i}>
                                <AiOutlineLink />
                                <Link className="text-blue-500 hover:underline overflow-hidden text-sm text-ellipsis " href={link}>{link}
                                </Link>
                                <span className="cursor-pointer" onClick={() => deleteLink(i)}><AiFillDelete /></span>
                            </div>
                        )}
                    </div>

                    <input className="flex-1 flex-col border rounded-md mb-2" type="text" placeholder="Social Media Posts link" value={links} onChange={(e) => setLinks(e.target.value)} />
                    <button className="py-2 px-4 rounded-md w-fit bg-blue-600 text-white mb-4 font-bold hover:scale-105 transition" onClick={addLinks}> + Add Link</button>

                    <input type="password" className="animate-none" placeholder="Passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} />
                    <button className="bg-amber-200 px-3 py-2 rounded-md font-semibold hover:scale-105 transition" type="submit" onClick={handleSubmit}>Add News</button>

                </form>
            </div>
        </>

    );

}