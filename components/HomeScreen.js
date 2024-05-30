"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

import Navbar from '@/components/Navbar'
const HomeScreen = () => {
    const { data: session } = useSession()
    const [showdropdown, setshowdropdown] = useState(false)
    const router = useRouter()
    const handleClick = ()=>{
        router.push('/welcome')
    } 

    return (

        <>
            <div className='relative flex flex-col h-[100vh]'
            // className="bg-[url('/background.png')] bg-cover bg-no-repeat h-[100vh] w-[100%]"
            >
                <nav className='bg-white text-blue-700 fixed top-0 z-10 w-[100vw] mx-auto  flex justify-around gap-28 h-[8vh] items-center px-4'>
                    <a className='logo text-lg font-bold flex items-center' href='/'>
                        GetMeAPopCorn
                        <Image src="/popcorn.gif" width={30} height={30}></Image>
                    </a>
                    <div className='flex items-center  gap-5 justify-center relative'>




                        {session &&

                            <>

                                <button id="dropdownDefaultButton" onBlur={() => setshowdropdown(!showdropdown)} onClick={() => setshowdropdown(!showdropdown)} data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                                </button>
                                <div id="dropdown" className={`z-10 absolute top-[6vh] ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                        <li onClick={() => log("dashboard")} >
                                            <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link href="#" onClick={() => log("Setting")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                                        </li>
                                        <li>
                                            <Link href={`/${session.user.name}`} onClick={() => log("pages")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                                        </li>
                                        <li>
                                            <Link href="/login" onClick={() => log("sign out")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                                        </li>
                                    </ul>
                                </div>

                            </>
                        }


                        {session &&
                            <button type="button" onClick={() => { signOut({ callbackUrl: '/', redirect: true }) }} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center hidden sm:inline-flex items-center  dark:hover:bg-[#050708]/30  ">
                                Logout
                            </button>}
                        {!session && <Link href={"/login"}>
                            <button type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center hidden sm:inline-flex items-center  dark:hover:bg-[#050708]/30  ">
                                Login
                            </button>
                        </Link>}


                    </div>
                </nav>

                <img src='/background.png' className='z-[0] absolute object-center sm:object-left  object-cover h-[100vh] w-[100%]' ></img>
                <h1 className=' bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 relative z-10 self-center text-2xl  sm:text-3xl md:text-5xl font-semibold mt-20 w-[80vw] md:w-[40%]  font-poppins text-center text-transparent inline-block bg-clip-text'>Make money doing what you love - it's that easy!</h1>
                <div className="z-10 InputContainer self-center mt-10  ">
                    <input placeholder="Search Creator.." id="input" className="input" name="text" type="text"/>

                </div>
                <div className='z-10 self-center mt-50 gap-3 justify-center flex flex-col items-center text-black' >
                <h1 >Or</h1>
                <button className='text-xl font-bold font-poppins bg-yellow-400 p-3 px-4 rounded-full' onClick={handleClick}>Start my page</button>
                <h1 className='text-bold text-slate-800 '>It’s free and takes less than a minute!</h1>
                </div>

            </div>
        </>
    )
}

export default HomeScreen
