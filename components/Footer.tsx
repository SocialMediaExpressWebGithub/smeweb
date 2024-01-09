import Link from 'next/link';
export default function Footer() {
  return (
    <div className='mt-5'>
     <footer className="flex justify-between py-2 border-t-4 top-2 mt-auto mb-1 text-slate-950">
        <div className="flex-1 h-2.5">
          <Link className="hover:underline text-slate-950" href={`${process.env.NEXT_PUBLIC_URL}/signin`}>&copy; {new Date().getFullYear()} Social Media Express.</Link>
        </div>

        <div className="flex-col left-0 right-0 space-x-3">
          <Link className="hover:underline text-slate-950" href={`${process.env.NEXT_PUBLIC_URL}/about`}>About</Link>
          <Link className="hover:underline text-slate-950" href={`${process.env.NEXT_PUBLIC_URL}/contact`}>Contact</Link>
        </div>

      </footer>

      {/* <div className="flex flex-col justify-between items-center h-0.3 space-x-3">
        <p>&copy; {new Date().getFullYear()} Social Media Express.</p>
      </div> */}


    </div>
  )
}