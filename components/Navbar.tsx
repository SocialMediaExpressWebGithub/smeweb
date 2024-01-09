
import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from 'react-icons/fa'; // Import icons from react-icons
import { FaXTwitter } from 'react-icons/fa6'
import { BsInstagram, BsTelegram, BsWhatsapp, BsYoutube } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="flex justify-between pb-1.5 mb-4 relative">

      <div>
        <div className="navbar-logo">
          <Image className="navbar-logo-image" src={"/logo.jpg"} alt="Logo" width={100} height={100} />
          <Link href={`${process.env.NEXT_PUBLIC_URL}`} ><span className="company-name" >Social Media Express</span></Link>
        </div>

        <p className="text-sm pt-1.5">Digital News Media platform</p>
        <div className="pt-1.5 mt-1.5 space-x-4 ">
          <ul className="flex space-x-3">
            <li>
              <a
                href="https://whatsapp.com/channel/0029Va4HL5A7T8bOLRgLyp3U"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link "
                style={{ fontSize: '1.5rem', color: "#00ff00", }}
              >
                <BsWhatsapp />
              </a>
            </li>

            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100071518666340&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link "
                style={{ fontSize: '1.5rem', color: "#0866ff", }}
              >
                <FaFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/SMEMedia007?t=0DYTqQ_z8Sh23IRs8a8cqg&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ fontSize: '1.5rem' }}
              >
                <FaXTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/socialmediaexpress.sme?utm_source=qr&igshid=MzNlNGNkZWQ4Mg=="
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ fontSize: '1.5rem', color: "#dd7a62" }}
              >
                <BsInstagram />
              </a>
            </li>

            <li>
              <a
                href="https://notgiven"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ fontSize: '1.5rem', color: "#82c7ff" }}
              >
                <BsTelegram />
              </a>
            </li>

            <li>
              <a
                href="https://youtube.com/@SocialMediaExpress?si=4RinV591rRvSp3R1"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ fontSize: '1.5rem', color: "#f00" }}
              >
                <BsYoutube />
              </a>
            </li>
          </ul>
        </div>

      </div>

    </div>
  )
}