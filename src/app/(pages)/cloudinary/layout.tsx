'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react'

const CloudinaryLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-col items-center py-5'>
      <Link href={'/cloudinary'}>
        <h1 className='text-3xl md:text-5xl uppercase'>Cloudinary</h1>

      </Link>

      <div className="flex gap-4 items-center flex-col sm:flex-row my-4">
        <Link
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="/cloudinary/upload"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          Upload More
        </Link>
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="https://console.cloudinary.com/pm/c-444671777a6e62c2912a9477a5e6de/getting-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read docs
        </a>
      </div>
      {children}
    </div>
  );
}

export default CloudinaryLayout
