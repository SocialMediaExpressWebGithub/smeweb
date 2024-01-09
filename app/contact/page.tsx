"use client"

import { ServiceType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const apipass = process.env.SECRET_CODE;

export default function Contact() {



    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [errMsg, setErrMsg] = useState([]);
    const [respMsg, setRespMsg] = useState("");
    const [serviceList, setServiceList] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchServices = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/services`, {
                    method: "GET",
                    cache: "no-cache"
                });

                if (res.ok) {
                    const dbres = await res.json();
                    setServiceList(dbres?.services_data);
                } else {
                    setServiceList([]);
                }
            } catch (error) {
                console.log("getnews error:", error);
                setServiceList([]);
            }
        };

        fetchServices();
    },);




    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();
        // setInputError(false)
        // setResmsgStatus(false);

        if (!fullname || !email || !message || !selectedService ) {
            toast.error("All the fields are required");
            return;
        }else{
            try {
                const res = await fetch(`api/contact`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ fullname, email, message, selectedService})
                });
                const db_res = await res.json();

                if (db_res.status == 200) {
                    toast.success("Message sent succesfully")
                    router.push(`${process.env.NEXT_PUBLIC_URL}`);
                } else {
                    toast.error("Error")
                    // return signOut();
    
                }
            } catch (error) {
                toast.error("Error in sending email.")
                console.log(error)
                return;
            }
        }

       
    }


    return (
        <>
            <div className="justify-between items-center border-t px-5" >

                <h3 className="text-xl font-bold py-2">Add news details</h3>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <label htmlFor="fullname">Full name</label>
                    <input type="text" id="fullname" placeholder="type your-name" onChange={(e) => {
                        setFullname(e.target.value)
                    }} value={fullname} />

                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="type your-email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} value={email} />

                    <label htmlFor="email">Services</label>
                    <select title="select" className="select" onChange={(e) => setSelectedService(e.target.value)}>
                        <option value="">Select service</option>
                        {serviceList && serviceList.map((service: ServiceType) => (
                            <option key={service.id} value={service.servicesname} >{service.servicesname}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="message">Message</label>
                    <textarea className="h-50" id="message" placeholder="type your message..." onChange={(e) => {
                        setMessage(e.target.value)
                    }} value={message} />


                    <div className="flex items-center justify-between py-3">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Send
                        </button>
                    </div>




                </form>

            </div>


        </>

    )
}