"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { motion } from "framer-motion";
// import {Variants} from "framer-motion";


import Navbar from '@/components/Navbar'
const HomeScreen = () => {

    // const fadeInUpAnimation:Variants={}
    const { data: session } = useSession()
    const [showdropdown, setshowdropdown] = useState(false)
    const [SearchText, setSearchText] = useState("")
    const router = useRouter()

    const handleChange = (e) => {

        setSearchText(e.target.value)
        console.log(SearchText)

    }
    const search = (e) => {
        if (e.key === "Enter") {
            router.push(`/${SearchText}`)
        }
    }
    const handleClick = () => {
        router.push('/welcome')
    }
    const goTo = (path) => {
        router.push(path)
    }

    return (

        <>
            <div 
           
            
            className='relative flex flex-col md:gap-2 gap-10 h-[100vh]'
            // className="bg-[url('/background.png')] bg-cover bg-no-repeat h-[100vh] w-[100%]"
            >
                <nav className='bg-white text-blue-700 fixed top-0 z-30 w-[100vw] mx-auto  flex justify-around gap-1 md:gap-28 h-[8vh] items-center px-4'>
                    <a className='logo text-lg font-bold flex items-center' href='/'>
                        GetMeAPopCorn
                        <Image src="/popcorn.gif" width={30} height={30}></Image>
                    </a>
                    <div className='flex items-center  gap-5 justify-center relative'>
                        <a className='font-semibold' href='/explore'>Explore</a>
                        <a className='font-semibold' href='/about-us'>About</a>
                        {session &&
                            <>
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button type="button" onBlur={() => setshowdropdown(false)} onClick={() => setshowdropdown(!showdropdown)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            {session.user.email}
                                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>


                                    <div className={`absolute right-0 z-10 mt-2 w-56 ${showdropdown ? "" : "hidden"} origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">

                                            <a href="/settings" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a>
                                            <a href={`/${session.user.pageName}`} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Your Page</a>

                                            <button type="button" onClick={() => { signOut({ callbackUrl: '/', redirect: true }) }} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center  sm:inline-flex items-center  dark:hover:bg-[#050708]/30  ">
                                                Logout
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </>
                        }


                        {/* {session &&
                            <button type="button" onClick={() => { signOut({ callbackUrl: '/', redirect: true }) }} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center  sm:inline-flex items-center  dark:hover:bg-[#050708]/30  ">
                                Logout
                            </button>} */}
                        {!session && <Link href={"/login"}>
                            <button type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center  sm:inline-flex items-center  dark:hover:bg-[#050708]/30  ">
                                Login
                            </button>
                        </Link>}


                    </div>
                </nav>

                <img src='/background.png' className='z-[0] absolute object-left-bottom md:object-center sm:object-left object-cover h-[100vh] w-[100%]' ></img>
                <motion.h1
                    initial={{ opacity: 0, y:50 }}
                    whileInView={{opacity:1,y:0}}
                    // animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.1,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    viewport={
                        {
                          once: false,
                    
                        }
                      }
                    className=' bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 relative z-10 self-center text-2xl  sm:text-3xl md:text-5xl font-semibold sm:mt-20 mt-24 w-[80vw] md:w-[60%] sm:w-[60%] font-poppins text-center text-transparent inline-block bg-clip-text select-none'>Make money doing what you love - it's that easy!
                </motion.h1>
                <motion.div
                   initial={{ opacity: 0, y:50 }}
                   whileInView={{opacity:1,y:0}}
                   // animate={{ opacity: 1, y: 0 }}
                   transition={{
                       duration: 0.4,
                       delay: 0.1,
                       ease: [0, 0.71, 0.2, 1.01]
                   }}
                   viewport={
                       {
                         once: false,
                   
                       }
                     }
                    className="z-10 InputContainer self-center mt-1 sm:mt-10  ">
                    <input placeholder="Search Creator.." id="input" onKeyDown={search} value={SearchText} onChange={handleChange} className="input" name="text" type="text" />

                </motion.div>
                <motion.div
                   initial={{ opacity: 0, y:50 }}
                   whileInView={{opacity:1,y:0}}
                   // animate={{ opacity: 1, y: 0 }}
                   transition={{
                       duration: 0.4,
                       delay: 0.1,
                       ease: [0, 0.71, 0.2, 1.01]
                   }}
                   viewport={
                       {
                         once: false,
                   
                       }
                     }
                    className='z-10 self-center mt-50 gap-3 justify-center flex flex-col items-center text-black' >
                    <h1 >Or</h1>
                    <button className=' sm:text-xl select-none text-sm sm:font-bold font-medium hover:bg-indigo-50 font-poppins hover:text-slate-600 bg-yellow-300 sm:p-3 p-1 sm:px-4 px-2 rounded-full' onClick={handleClick}>Start my page</button>
                    <h1 className='text-bold select-none text-sm text-slate-800 sm:block hidden  '>It’s free and takes less than a minute!</h1>
                </motion.div>

            </div>
        </>
    )
}

export default HomeScreen
