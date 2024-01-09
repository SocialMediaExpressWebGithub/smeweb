import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { NextAuthProvider } from '@/components/Providers'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Media Express',
  description: 'Social Media Express Digital News platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        {/* <Suspense fallback={<Loading/>}> */}
        <div className='lg:max-w-[1466px] lg:px-auto mx-auto py-5 shadow-xl min-h-screen flex flex-col px-3'>
          <Navbar />
          <div className='flex-auto'>
            {children}
          </div>
          <Footer />
        </div>
        <Toaster/>
        {/* </Suspense> */}
        </NextAuthProvider>
      </body>
    </html>
  )
}
