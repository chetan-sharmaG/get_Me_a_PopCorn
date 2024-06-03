"use client"
import React from 'react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import { checkIfUserExist } from '@/actions/useractions'
import { PageCreation } from '@/actions/useractions'
import { RazorPayDetails } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NativeBuffer } from 'mongoose'
import Navbar from '@/components/Navbar'
import { joinAsFan } from '@/actions/useractions'

const Welcome = () => {

  const { data: session, status } = useSession()
  const [currentPop, setCurrentPop] = useState(0);
  const router = useRouter()
  const ref = useRef()
  const retry = useRef()
  const checkpage = useRef()
  const finish =useRef()
  let isFirstTime = false
  // const [userExist, setUserExist] = useState(null)
  const [pageName, setPageName] = useState('')
  const [pageSuccess, setpageSuccess] = useState('')
  const [channelName, setchannelName] = useState('')
  const [razordetails, setrazordetails] = useState({ razorid: '', razorsecret: '' })
  const [error, setError] = useState({ status: false, message: '' })
  const [userDetails, setuserDetails] = useState('')
  const handleChangeOnPageName = (e) => {
    const value = e.target.value;
    setPageName(value)
    validateInput(value)
    // setUserExist(null)
    // setError({...error,status:false,message:""})
    ref.current.style.display = "none"

  }

  useEffect(() => {
    if (status === "authenticated") {
      if (session) {
        setuserDetails(session.user)
        console.log(session.user)
        if (!session.user.firstTimeSetupDone) {
          isFirstTime = true
          return
        }
        else{
          router.push(`/${session.user.pageName}`)
        }
      }
      if (!isFirstTime) {
        console.log("not first")
      }
    }


  }, [status])

  // if(session.user.firstTimeLogin){
  //   console.log("First Time")
  // }
  // else{
  //   console.log("already here")
  // }

  const handleChangeOnRazor = (e) => {
    setrazordetails({ ...razordetails, [e.target.name]: e.target.value })
    console.log(razordetails)
  }

  const joinasFan = async()=>{
    let a = await joinAsFan(session.user.email)
    router.push('/')
  }
  const finishBotton = async () => {
    finish.current.textContent="We are Close..Ahhhh"
    let a = await RazorPayDetails(session.user.email, razordetails.razorid, razordetails.razorsecret)
    if (a) {
      router.push(`/${pageName}`)
    }
    else {
      toast.error('Please Retry Again', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  }
  const handleChangeOnChannelName = (e) => {
    const value = e.target.value;
    setchannelName(value)
    // validateInput(value)
    // setUserExist(null)
    // ref.current.style.display = "none"

  }

  const updateUserData = async () => {
    
    retry.current.style.cursor = "not-allowed";
    retry.current.disabled = true;  
    retry.current.textContent="Hang on tight.."

    let update = await PageCreation(session.user.email, pageName, channelName)
    if (update) {
      setCurrentPop(prev => prev + 1)
      setpageSuccess(true)
    }
    else {
      retry.current.style.cursor = "pointer";
    retry.current.disabled = false;  
      retry.current.textContent = "One more Try?"
      retry.current.style.background = "yellow"
    }
    //if Welcome creation success show success message and update Pagesuccess to true
    // setCurrentPop(prev => prev + 1)
    // setpageSuccess(true)
  }


  const validateInput = (value) => {
    const regex = /[^a-zA-Z0-9-_]/;
    setError({ ...error, status: regex.test(value), message: regex.test(value) ? "Only - and  _ Special Characters are Allowed " : "" })
    console.log(error)
  }
  if (status === "loading") {
    return <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
        <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this Page.</p>
      </div>
    </>
  }
  if (status === "unauthenticated") {
    return <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        {/* <div className=" ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div> */}
        <h2 className="text-center text-white text-xl font-semibold">You Need To Be Logged In To Access This Page...</h2>
        <a href='/login' className="w-fit bg-black p-2 mt-2 text-white rounded-lg text-center">Login</a>
      </div>
    </>
  }

  // useEffect(() => {
  //   if (status === 'loading') return;
  //   if (!session) return;

  // }, [session, status])

  const handleContinueClick = () => {
    setCurrentPop(prevRow => prevRow + 1);
  };

  const handleBackClick = () => {
    setCurrentPop(prevRow => prevRow - 1);
  };


  const checkIfUserNameExist = async (username) => {
    checkpage.current.style.cursor = "not-allowed";
    checkpage.current.disabled = true;
    ref.current.style.display = "block"
    ref.current.src = '/loading.gif'
    checkpage.current.textContent ="Checking PageName...."

    console.log("checkingg if user exist")
    let a = await checkIfUserExist(username)
    // let a = false
    if (!a) {
      // setCurrentPop(prev => prev + 1)
      checkpage.current.textContent ="Almost Done Hang On...."
      ref.current.src = '/tick.png'
      setTimeout(() => {
        setCurrentPop(prev => prev + 1)
      }, 2000);
      // ref.current.textContent = "Continue"
    }
    else {
      checkpage.current.disabled = false;
      ref.current.src = '/close.png'
      checkpage.current.style.cursor = "pointer";
      console.log("user exist")
      checkpage.current.textContent ="Check for page availibity "
      setError({ ...error, status: true, message: "Page already Exists.Try a New Name" })
    }
  }
  // const ref = useRef()
  //     ref.current = session.user.name
  //    console.log(ref.current)

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
/>
      {/* Same as */}
      {/* <Navbar/> */}
      <img src='/space.jpg' className='w-[100vw] h-[100vh] object-cover absolute z-0' ></img>
      <ToastContainer />
      <div className='relative z-10 h-screen w-full md:w-screen flex items-center justify-center '>
        {currentPop === 0 &&
          <div className='bg-[#330760]  border-yellow-300 border-[0.1px] border-opacity-25  rounded-lg h-[80vh] md:h-[70vh] w-[90vw] mx-auto md:w-[500px] px-10 flex flex-col items-center justify-center gap-2'>
            {/* {session && <span className='text-3xl'>Welcome  {session.user.name}</span>} */}
            <div className='flex flex-col md:gap-5 text-white gap-5 items-center justify-center'>
              <span className='text-3xl text-center'>Welcome  {userDetails.name}</span>
              <span className=' text-center'>Already, there are over 250,000 creators on GetMeAPopcorn, and we're about to welcome one more</span>
              <div className='bg-gray-100 w-full h-[1px]'></div>
              <div className='w-[85%]'>
                <ul className='flex flex-col gap-2'>
                  <li className='flex gap-3 items-center'>
                    <Image width={30} height={30} src="https://img.icons8.com/color/40/sparkling.png" alt="sparkling" />
                    Start your own PopCorn in just a few steps.</li>
                  <li className='flex gap-3 items-center'>
                    <Image width="30" height="30" src="https://img.icons8.com/color/30/conference-call--v1.png" alt="conference-call--v1" />
                    Invite fans and connect with them directly for free. There are no algorithms here.</li>
                  <li className='flex gap-3 items-center'>
                    <Image width="30" height="30" src="https://img.icons8.com/plasticine/30/cash--v1.png" alt="cash--v1" />
                    When you're ready to earn money, it's easy to offer a paid membership or sell digital products.
                  </li>
                </ul>
              </div>
              <button type="button" onClick={() => handleContinueClick()} className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Continue</button>
              <div className='flex gap-2 text-sm'>
                <span >Not a creator?</span>
                <span onClick={joinasFan} className='font-bold cursor-pointer'>Join as Fan</span>
              </div>

            </div>

          </div>
        }
        {currentPop === 1 &&
          <div className='bg-[#330760]  border-yellow-300 border-[0.1px] border-opacity-25  rounded-lg h-[60vh]  md:h-[50vh] w-[90vw] mx-auto md:w-[500px] px-10 flex flex-col items-center justify-center gap-2'>
            <div className='flex flex-col md:gap-6 text-white gap-5 w-[80%] items-center justify-center'>
              <div className='flex flex-col gap-2'>
                <span className='text-3xl text-center'>Let's name your page </span>
                <span className=' text-center'>You can always change this later.</span>
              </div>
              <div className='flex flex-col gap-2 w-full '>
                <span className=' flex relative'><span className='absolute top-[50%] left-[7px] pointer-events-none translate-y-[-50%]'>GetMeAPopcorn/</span>
                  <input type='text'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      checkIfUserNameExist(pageName)
                    }
                  }} spellCheck={false} placeholder='Page Name' value={pageName} onChange={handleChangeOnPageName} className='outline-none  bg-slate-700 border text-bold p-2 pl-[60%] sm:pl-[40%] rounded-lg w-full border-white placeholder-opacity-70' />
                  <Image ref={ref} src='/loading.gif' width={30} height={40} className='hidden absolute right-[-40px] top-[50%] translate-y-[-50%]'></Image>
                </span>
                {error.status && (<span className='error text-red-600 text-center'> {error.message} </span>)}

                <span className='text-center opacity-50 text-xs'>Ex: Coke-Studio , CodeWithZake </span>
              </div>
              <div className='flex gap-2 w-full flex-col'>
                <button ref={checkpage} type="button"  disabled={!pageName || error.status ? true : false} onClick={() => checkIfUserNameExist(pageName)} className={`w-full text-gray-900 bg-white border ${!pageName || error.status ? "cursor-not-allowed" : "cursor-pointer"}  border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Check pagename availbility</button>

                <button type="button" onClick={() => handleBackClick()} className="w-full text-gray-900 bg-slate-700 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Back</button>

              </div>

            </div>
          </div>
        }
        {currentPop === 2 &&
          <div className='bg-[#330760]  border-yellow-300 border-[0.1px] border-opacity-25 rounded-lg h-[60vh]  md:h-[50vh] w-[90vw] mx-auto md:w-[500px] px-10 flex flex-col items-center justify-center gap-2'>
            <div className='flex flex-col md:gap-6 text-white gap-5 w-[80%] items-center justify-center'>
              <div className='flex flex-col gap-2'>
                <span className='text-3xl text-center'>Let's name your channel</span>
                <span className=' text-center'>You can always change this later.</span>
              </div>
              <div className='flex flex-col gap-2 w-full '>
                {/* <span className=' flex relative'><span className='absolute top-[50%] left-[7px] pointer-events-none translate-y-[-50%]'>GetMeAPopcorn/</span> */}
                <input type='text'
                spellCheck={false}
                 onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateUserData()
                  }
                }} placeholder='Channel Name' value={channelName} onChange={handleChangeOnChannelName} className='outline-none  bg-slate-700 border p-2 text-center md:pl-[0%] md:text-center rounded-lg w-full border-white placeholder-opacity-70' />
                <Image ref={ref} src='/loading.gif' width={30} height={40} className='hidden absolute right-[-40px] top-[50%] translate-y-[-50%]'></Image>
                {/* </span> */}
                {/* {error && (<span className='error text-red-600 text-center'> Only - and  _ Special Characters are Allowed </span>)} */}

                <span className='text-center opacity-50 text-xs'>Ex: Coding with Jami, The Kapil Sharma Show </span>
              </div>
              <div className='flex gap-2 w-full flex-col'>
                <button ref={retry} type="button" disabled={!channelName ? true : false} onClick={() => updateUserData()} className={`w-full text-gray-900 bg-white border ${!channelName ? "cursor-not-allowed" : "cursor-pointer"}  border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Create Channel</button>
                <button type="button" onClick={() => handleBackClick()} className="w-full text-gray-900 bg-slate-700 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Back</button>

              </div>

            </div>
          </div>
        }
        {currentPop === 3 &&
          <>
            <div className='bg-[#330760]  border-yellow-300 border-[0.1px] border-opacity-25 rounded-lg h-[60vh]  md:h-[60vh] w-[90vw] mx-auto md:w-[500px] px-10 flex flex-col items-center justify-center gap-2'>
              <div className='flex flex-col md:gap-6 gap-5 w-[80%] text-white items-center justify-center'>
                <div className='flex flex-col gap-2'>
                  <span className='text-3xl flex items-center gap-2 justify-center'>congratulations <lord-icon
                    src="https://cdn.lordicon.com/fkmafinl.json"
                    trigger="loop"
                    delay="500"
                    state="in-reveal"
                    style={{ width: "50px", height: "50px" }}>
                  </lord-icon></span>
                  <span className=' text-center'>{pageName} was hosted succesfully❤️ </span>
                </div>
                <div className='flex flex-col gap-2 w-full '>
                  {/* <span className=' flex relative'><span className='absolute top-[50%] left-[7px] pointer-events-none translate-y-[-50%]'>GetMeAPopcorn/</span> */}
                  {/* <label type="text">Enter Razorpay ID</label> */}
                  <input type='text' placeholder='Enter Razorpay ID' name="razorid" value={razordetails.razorid} onChange={handleChangeOnRazor} className='outline-none  bg-slate-700 border p-2 text-center md:pl-[0%] md:text-center rounded-lg w-full border-white placeholder-opacity-70' />

                  <input type='text' placeholder='Enter Razorpay SecretKey' name='razorsecret' value={razordetails.razorsecret} onChange={handleChangeOnRazor} className='outline-none  bg-slate-700 border p-2 text-center md:pl-[0%] md:text-center rounded-lg w-full border-white placeholder-opacity-70' />
                  <a href='https://razorpay.com/docs/payments/dashboard/account-settings/api-keys/' target='_blank' className='text-sm text-yellow-300 hover:underline' >How to get razorpay id and secret ?&#9432;</a>
                  <span className='text-center opacity-50 text-xs'>Note: Without Providing razorPay details you wont receive the money </span>
                </div>
                <div className='flex gap-0 w-full items-center justify-center flex-col'>
                  <button ref={finish} type="button" disabled={!razordetails.razorid && !razordetails.razorsecret ? true : false} onClick={() => finishBotton()} className={`w-full text-gray-900 bg-white border ${!razordetails.razorid && !razordetails.razorsecret ? "cursor-not-allowed" : "cursor-pointer"}  border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Finish</button>
                  <a href={`/${pageName}`}  >Not Now</a>
                </div>

              </div>
            </div>
          </>}
      </div>
    </>
  )
}

export default Welcome
