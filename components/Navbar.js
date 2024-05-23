"use client"
import React from 'react'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)

  const log = (same)=>{
    console.log(same)
  }
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  return (
    <nav className='bg-blue-800 text-white flex justify-between h-[8vh] items-center px-4'>
      <a className='logo' href='/'>
        GetMeAPopCorn
      </a>
      {/* <ul className='flex gap-5'>
          <li>Home</li>
          <li>About</li>
          <li>Login</li>
        </ul> */}
      <div className='flex items-center  gap-5 justify-center relative'>




        {session &&

          <>

            <button id="dropdownDefaultButton" onBlur={() => setshowdropdown(!showdropdown)} onClick={() => setshowdropdown(!showdropdown)} data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>
            <div id="dropdown" className={`z-10 absolute top-[6vh] ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li onClick={()=>log("dashboard")} >
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href="#"  onClick={()=>log("Setting")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} onClick={()=>log("pages")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link href="/login" onClick={()=>log("sign out")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>

          </>
        }


        {session &&
          <button type="button" onClick={() => { signOut() }} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center  dark:hover:bg-[#050708]/30  ">
            Logout
          </button>}
        {!session && <Link href={"/login"}>
          <button type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center  dark:hover:bg-[#050708]/30  ">
            Login
          </button>
        </Link>}


      </div>
    </nav>
  )
}

export default Navbar
