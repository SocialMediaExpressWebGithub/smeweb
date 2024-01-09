import { FaFacebook, FaLinkedin } from 'react-icons/fa'; // Import icons from react-icons
import { FaXTwitter } from 'react-icons/fa6';

export default function About() {
  return (
    <>
      <div className="border-b border-b-300 py-3 px-3 border rounded-md shadow-md border-gray-200 mt-1">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <div className="">
          <p className='p-3'>
            Social Media Express is digital news platform with thrieve motto of <span className="font-bold text-custom">Expressing the Truth</span>. social media Express is also Registered under MSME. No.  <span className="font-bold text-custom">UDYAM-MN-05-0008295</span>.
            Reside at Kangleipak , Uripok, India, 795001. Bringing up latest news, events happening in all around the world.
            <br></br><br></br>
            Regarding Services and business we request an appointment.
            <br></br><br></br>Check out our social media platform and connect with us.
          </p>
          <div className='p-2'>
            <ul className="flex space-x-3">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>

          </div>

        </div>

        {/* Add more content here */}
      </div>
    </>


  )
}

