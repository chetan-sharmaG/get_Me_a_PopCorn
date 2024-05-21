"use client"
import React from 'react'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"

const page = () => {

  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) return;

  }, [session, status])


  // const ref = useRef()
  //     ref.current = session.user.name
  //    console.log(ref.current)

  return (
    <>
      <div className='h-screen w-screen  flex items-center justify-center'>
        <div className='bg-slate-700 rounded-lg h-[70vh] w-[500px] px-10 flex flex-col items-center justify-center gap-2'>
          {/* {session && <span className='text-3xl'>Welcome  {session.user.name}</span>} */}
          <div className='flex flex-col gap-4 items-center'>
            <span className='text-3xl'>Welcome  Chetan Sharma</span>
            <span className=' text-balance'>Already, there are over 250,000 creators on BUYMeAPopCorn, and we're about to welcome one more — you</span>
            <div className='bg-gray-100 w-full h-[1px]'></div>
            <div >
              <ul>
                <li>
                  Start your own Patreon in just a few steps.</li>
                <li>Invite fans and connect with them directly for free. There are no algorithms here.</li>
                <li>When you're ready to earn money, it's easy to offer a paid membership or sell digital products.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default page
