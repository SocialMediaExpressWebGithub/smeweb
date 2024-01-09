"use client"
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function SignInComp() {
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [showSignin, setShowSignin] = useState(false);
  const [btnAdmin, setBtnAdmin] = useState(false);
  const [oncClick, setOnceClick] = useState(true);

  const checkPasscode = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/passcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passcode }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setMessage(data.message);
        setShowSignin(true);
      } else {
        const data = await res.json();
        setMessage(data.error_message);
        setCounter(counter + 1);
        setShowSignin(false);
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <>

      <div className="flex flex-col md:flex-row p-5 border bt-1 ">
        <div className="flex flex-col p-5">
          <h2 className="text-2xl font-bold">Terms and Conditions</h2>
          <ul className="list-disc ml-5">
            <li>
              This website/ web-apps is all rights reserved to Social Media Express Regd.<span className="font-bold text-custom">UDYAM-MN-05-0008295</span>
            </li>
            <li>
              All the news and images are all copyright and reserve to Social Media Express
            </li>
            <li>
              Any fraudulent found with this website will be file cases under Cyber-crime Act under Indian Penal Code : 65,66F,70.
            </li>
            <li> All the sources we upload are approved and sign under the above registration.
            </li>
            <li> We do not share or forward any fake news. All the news are collected by our respected press and media reporters and agents. We maintain all the required measure and precautions.
            </li>
          </ul>
          <br></br>
          <ul>
            <ul>

              {oncClick == true ?
                <button
                  onClick={(e) => {
                    setBtnAdmin(true);
                    setOnceClick(false);
                    e.currentTarget.disabled = true; // Disabling the button after click
                  }}
                  className="btn bg-red-500"
                  disabled={btnAdmin} // Disabling the button based on the state
                >Sign as Admin</button>

                : null}
            </ul>
          </ul>

        </div>



        &nbsp;
        <br></br>

        {btnAdmin == true ? <div className="flex flex-col items-center justify-center gap-3 md:my-1 md:py-12 border rounded-md border-red-500 bg-gray-400">

          {counter === 3 ?
            <div className="p-3">
              <p>
                You have entered 3 incorrect passcodes.
                <h3 className="font-bold text-red-500">You are not Authorized.</h3>
                <br></br>
                Go to the <Link href="/" className="font-bold text-blue-500">Homepage</Link>
              </p>
            </div>
            :

            <>
              <h1 className="text-2xl font-bold text-center mt-3">Passcode</h1>
              <p className={`flex-col text-sm ${showSignin ? "text-green-800" : "text-red-700"}`}>
                {message}
              </p>
              <input
                className="mx-3 px-3"
                onChange={(e) => setPasscode(e.target.value)}
                type="password"
                name="password"
                value={passcode}
                placeholder="Enter the passcode"
              />
              {
                showSignin ? null : <button
                  onClick={checkPasscode}
                  className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate/25 transition font-extrabold mb-3"
                >
                  Enter
                </button>
              }

              {showSignin && (
                <button
                  onClick={() => signIn('google')}
                  className="flex items-center border  border-red-500 p-4 rounded-full gap-4 hover-bg-slate/25 transition mb-3"
                >
                  <span>
                    <Image src="/admin.png" alt="Admin logo" width={30} height={30} />
                  </span>
                  Sign In As Admin
                </button>
              )}
            </>

          }
        </div> : null}



      </div>


    </>




  );
}
