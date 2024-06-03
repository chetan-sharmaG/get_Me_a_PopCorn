"use client"
import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchPayments, initiate, fetchUser } from '@/actions/useractions'
import { useSession, signIn, signOut } from "next-auth/react"
import { uploadFile } from '@/actions/useractions'
import { updatePageDetails } from '@/actions/useractions'
import Post from './Post'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { createPost } from '@/actions/useractions'
import Image from 'next/image'
import { subscribeToCreator } from '@/actions/useractions'



const PaymentPage = ({ username }) => {

    const router = useRouter()
    const joinChannelButton = useRef()
    const { data: session, status } = useSession()
    const [paymentform, setpaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [form, setform] = useState({})
    const [searchResult, setsearchResult] = useState(null)
    const [Payments, setPayments] = useState([])
    const [userDetails, setuserDetails] = useState({ email: "", subscribers: [] })
    const [profileImageUrl, setprofileImageUrl] = useState(null)
    const [coverImageUrl, setcoverImageUrl] = useState(null)
    const [coverPic, setcoverPic] = useState()
    const [profilePic, setprofilePic] = useState()
    const [CoverFile, setCoverFile] = useState()
    const profileRef = useRef()
    const [postform, setpostform] = useState({})
    const [display, setdisplay] = useState(false)
    const [likes, setlikes] = useState(false)
    const coverRef = useRef()
    const saveButton = useRef()
    const [uploadComplete, setUploadComplete] = useState(false);
    const postCreation = useRef()
    const [postMedia, setpostMedia] = useState()
    const scrollTo = useRef()
    const saveButtonRef = useRef()
    const dialogRef = useRef()
    const [navstate, setnavstate] = useState(0)

    const scrolltopost = () => {
        scrollTo.current.scrollIntoView()
    }
    const CancelButton = () => {
        saveButton.current.style.display = "none"
    }
    const handlePostFormChanges = (e) => {
        const { name, value } = e.target
        setpostform({ ...postform, [name]: value })
        console.log(postform)
    }


    const CreatePost = () => {


    }
    const handleFileChange = (e) => {
        const { name, files } = e.target
        if (name === 'coverPic') {
            setcoverPic(files[0])
            saveButton.current.style.display = "flex"
            const url = URL.createObjectURL(files[0]);
            setcoverImageUrl(url)
            coverRef.current.style.opacity = 0
        }
        else if (name === 'profilePic') {
            setprofilePic(files[0])
            saveButton.current.style.display = "flex"
            const url = URL.createObjectURL(files[0]);
            setprofileImageUrl(url)
            profileRef.current.style.opacity = 0
        }
        else if (name === 'postMediaUrl') {

            console.log(files[0])
            setpostMedia(files[0])
            console.log(postMedia)
        }
    }

    const handleformChange = (e) => {
        saveButton.current.style.display = "flex"
        setform({ ...form, [e.target.name]: e.target.value })
        console.log(form)
    }


    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        if (status === "authenticated") {
            if (session) {
                setuserDetails(session.user)
                console.log(session.user)
            }
        }
    }, [status])

    useEffect(() => {
        if (uploadComplete) {
            const updateUserData = async () => {
                console.log(form);
                const a = await updatePageDetails(currentUser.email, form);
                if (a) {
                    saveButton.current.style.display = "none"
                    toast('Page Details Updated!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                } else {
                    // Handle the failure case
                    toast('Failed to update Page Details', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                }
            };
            updateUserData();
        }
    }, [uploadComplete, form]);

    const handleChange = (e) => {

        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
        console.log(paymentform)
    }

    const fetchSessionUserData = async () => {
        let u = await fetchUser(session.user.email)
    }
    const getData = async () => {

        let u = await fetchUser(username)

        setsearchResult(u ? true : false)
        setcurrentUser(u)

        console.log(u)
        if (u)
            setform({ ...form, TeamName: u.TeamName, description: u.description })

        let dbPayments = await fetchPayments(username)
        setPayments(dbPayments)
        console.log(u, dbPayments)

    }


    const pay = async (amount) => {

        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get me a PopCorn", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();

    }

    const createPostandUpload = async () => {
        await uploadPostMediaInFirebase();
    }

    const uploadPostMediaInFirebase = async () => {
        console.log("sending post data to firebase")
        const formdata = new FormData();
        if (postMedia) {
            formdata.append('coverPic', postMedia)
            const res = await fetch('https://pop-corn-back-end.vercel.app/upload', {
                method: 'POST',
                body: formdata,

            })
            const result = await res.json();
            console.log(result)
            if (result) {
                if (result.coverPic) {
                    console.log("Posting")
                    let a = createPost(session.user.email, { ...postform, postMediaUrl: result.coverPic.fileUrl })
                    toast('Post Created !!!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                    setdisplay(!display)
                    getData()
                }
            }

        }



    }
    const uploadInFirebase = async () => {
        console.log("sending")
        const formdata = new FormData()
        // console.log(CoverFile)
        if (coverPic) {
            formdata.append('coverPic', coverPic)
        }
        if (profilePic) {
            formdata.append('profilePic', profilePic)
        }
        const res = await fetch('https://pop-corn-back-end.vercel.app/upload', {
            method: 'POST',
            body: formdata,

        })
        const result = await res.json();

        const updateFormWithFileUrl = (fileKey, fileUrl) => {
            return new Promise((resolve) => {
                setform((prevForm) => {
                    const updatedForm = { ...prevForm, [fileKey]: fileUrl };
                    resolve(updatedForm);
                    return updatedForm;
                });
            });
        };

        if (result.coverPic) {
            await updateFormWithFileUrl('coverPic', result.coverPic.fileUrl);
        }
        if (result.profilePic) {
            await updateFormWithFileUrl('profilePic', result.profilePic.fileUrl);
        }

        setUploadComplete(true);
    }


    const uploadData = async () => {
        setUploadComplete(false);
        saveButtonRef.current.textContent = "Saving"
        saveButtonRef.current.style.cursor = "not-allowed";
        saveButtonRef.current.disabled = true;
        await uploadInFirebase();
    }
    const copyToClipboard = () => {

        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST}${currentUser.pageName}`)
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }

    const handleRadio = (e) => {
        console.log("inside func")
        var value = e.target.value
        console.log(value)
    };
    const joinButton = async () => {
        if (status === 'unauthenticated') {
            toast.error('You Need to be Signed In to join!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        } else {
            let subscribe = await subscribeToCreator(session.user.email, currentUser._id)
            if (subscribe) {
                toast('User Joined!', {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                joinChannelButton.current.style.display = "none"
            } else {
                toast.error('There was an internal error!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            }
        }
    }

    function toogleDialog() {
        if (!dialogRef.current) {
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close() :
            dialogRef.current.showModal()
    }

    // const coverPicture = useRef()
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
            <ToastContainer />
            {/* <button id="rzp-button1">Pay</button> */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            {searchResult &&
                <>
                    {currentUser.email === userDetails.email &&
                        <div className="hidden md:block bg-slate-900 h-[100vh] w-[200px] text-white fixed top-0">
                            <div className='flex  w-full  flex-col mt-[8vh]'>
                                <button className='w-full text-sm h-[70px] '>Edit PageName</button>
                                <button onClick={() => {
                                    setdisplay(!display)
                                    scrolltopost()
                                    // router.push('#post')
                                }} className='w-full  h-[70px] text-sm text-center'>Create Post</button>
                                <button className='w-full  text-sm  h-[70px]'>Payment Dashboard</button>
                                <button className='w-full  text-sm  h-[70px]'>Subscribers</button>

                            </div>
                        </div>
                    }

                    <div className={`${currentUser.email === userDetails.email ? " md:w-[calc(100vw-200px)] w-full md:left-[200px]" : "w-full"} relative `}>
                        <div className='cover w-full relative z-10 '>

                            <div ref={saveButton} className='absolute hidden gap-2 top-[10vh] right-20 z-30'>
                                <button ref={saveButtonRef} className='bg-orange-400 font-bold w-[100px] p-3 text-black rounded-lg ' onClick={() => uploadData()}>Save</button>
                                <button className='bg-gray-600 font-bold w-[100px] p-3  text-white rounded-lg ' onClick={CancelButton}>Cancel</button>
                            </div>

                            <div className={`relative group ${currentUser.coverPic ? "" : "bg-pink-400 h-[200px] sm:h-[400px] w-full"}`}>
                                {currentUser.coverPic && <img className='w-full object-fill h-[200px] sm:h-[400px] relative ' ref={coverRef} src={currentUser.coverPic} />}

                                {userDetails.email === currentUser.email &&
                                    <>
                                        <div className=' hidden  p-10 group-hover:flex z-20 flex-col items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full'><span>Edit</span>
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/edit-image.png" alt="edit-image" />
                                            <input accept="image/*" onChange={handleFileChange} name='coverPic' type="file" className='opacity-0 cursor-pointer absolute w-full h-full' /></div>
                                    </>
                                }
                                {coverImageUrl &&
                                    <img className='w-full object-fill bg-white h-[400px] absolute top-0 ' src={coverImageUrl} />
                                }
                            </div>
                            <div className='absolute bottom-[-53px] left-[50%] translate-x-[-50%]'>
                                <div className={`relative group ${currentUser.profilePic ? "" : "bg-orange-400 rounded-xl h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] "}`}>
                                    {currentUser.profilePic && <img className='rounded-xl object-cover bg-white h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]' ref={profileRef} src={currentUser.profilePic} />}

                                    {userDetails.email === currentUser.email &&
                                        <>
                                            <div className=' hidden  p-10 group-hover:flex z-20 flex-col items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '><span className='text-black font-bold '>Edit</span><img width="48" height="48" src="https://img.icons8.com/color/48/edit-image.png" alt="edit-image" />
                                                <input accept="image/*" name='profilePic' onChange={handleFileChange} type="file" className='opacity-0 cursor-pointer absolute' /></div>
                                        </>
                                    }
                                    {profileImageUrl &&
                                        <img className='rounded-xl object-cover bg-white h-[150px] w-[150px] absolute top-0 ' src={profileImageUrl} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start items-center my-16 sm:gap-1 gap-1 relative' >
                            {currentUser.email === userDetails.email &&
                                <div className='settings absolute md:hidden top-[-50px] right-4'>

                                    <div className='flex gap-2 items-center justify-center'>

                                        <div className='group relative' onClick={() => {
                                            setdisplay(!display)
                                            router.push('#post')
                                        }}>
                                            <button
                                                title="Create Post"
                                                className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                                            >
                                                <svg

                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="30px"
                                                    height="30px"
                                                    viewBox="0 0 24 24"
                                                    className="stroke-gray-100  fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                                                >
                                                    <path
                                                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                                        strokeWidth="1.5"
                                                    ></path>
                                                    <path d="M8 12H16" strokeWidth="1.5"></path>
                                                    <path d="M12 16V8" strokeWidth="1.5"></path>
                                                </svg>
                                            </button>

                                            {/* <div className={`absolute ${display ? "block" : "hidden"} z-10 right-[100%] top-7 w-[350px] h-[400px] mx-auto `}>
            <div className='flex flex-col gap-10 items-center p-5 rounded-xl h-fit bg-slate-700 relative'>
                <div className='text-xl font-bold'>
                    Select a type
                </div>
                <div className='flex w-full justify-evenly'>
                    <div className='flex flex-col gap-1 text-sm font-bold cursor-pointer' onClick={() => {
                        setdisplay(!display)
                    }}>
                        <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/txt.png" alt="text" /><button>Text</button></div>
                    <div className='flex flex-col gap-1 text-sm font-bold'><lord-icon
                        src="https://cdn.lordicon.com/mpzsxzrz.json"
                        trigger="hover"
                        style={{ "width": "50px", "height": "50px" }}>
                    </lord-icon><button>Text</button></div>
                    <div className='flex flex-col gap-1 text-sm font-bold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ujxzdfjx.json"
                            trigger="hover"
                            style={{ "width": "50px", "height": "50px" }}>
                        </lord-icon>
                        <button>Text</button></div>

                </div>
                <div className='flex w-full justify-evenly mb-10'>
                    <div className='flex flex-col gap-1 text-sm font-bold'><img width="30" height="30" src="https://img.icons8.com/fluency/30/text.png" alt="text" /><button>Text</button></div>
                    <div className='flex flex-col gap-1 text-sm font-bold'><img width="30" height="30" src="https://img.icons8.com/dusk/30/video.png" alt="video" /><button>Text</button></div>
                    <div className='flex flex-col text-sm gap-1 font-bold'><img width="30" height="30" src="https://img.icons8.com/dusk/64/high-volume--v1.png" alt="high-volume--v1" /><button>Text</button></div>

                </div>
            </div>
        </div> */}
                                        </div>
                                        <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill='white' x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                            <path d="M 22.199219 2 A 1.0001 1.0001 0 0 0 21.214844 2.8339844 L 20.205078 8.796875 C 19.01608 9.1476749 17.903339 9.6072866 16.835938 10.173828 L 11.875 6.6816406 A 1.0001 1.0001 0 0 0 10.59375 6.7929688 L 6.6933594 10.693359 A 1.0001 1.0001 0 0 0 6.5820312 11.974609 L 10.076172 16.939453 C 9.5032306 17.983292 9.0447681 19.109183 8.6992188 20.298828 L 2.8457031 21.212891 A 1.0001 1.0001 0 0 0 2 22.199219 L 2 27.699219 A 1.0001 1.0001 0 0 0 2.8339844 28.685547 L 8.7949219 29.693359 C 9.1451119 30.880887 9.6045402 31.990547 10.169922 33.056641 L 6.6875 37.917969 A 1.0001 1.0001 0 0 0 6.7929688 39.207031 L 10.693359 43.107422 A 1.0001 1.0001 0 0 0 11.974609 43.21875 L 16.939453 39.724609 C 17.985462 40.298683 19.114316 40.757752 20.306641 41.103516 L 21.314453 47.066406 A 1.0001 1.0001 0 0 0 22.300781 47.900391 L 27.800781 47.900391 A 1.0001 1.0001 0 0 0 28.783203 47.082031 L 29.884766 41.107422 C 31.077734 40.756262 32.193186 40.294742 33.263672 39.726562 L 38.224609 43.21875 A 1.0001 1.0001 0 0 0 39.507812 43.107422 L 43.40625 39.207031 A 1.0001 1.0001 0 0 0 43.509766 37.914062 L 39.931641 32.957031 C 40.500209 31.91951 40.957756 30.82106 41.300781 29.693359 L 47.169922 28.685547 A 1.0001 1.0001 0 0 0 48 27.699219 L 48 22.199219 A 1.0001 1.0001 0 0 0 47.166016 21.214844 L 41.199219 20.203125 C 40.855563 19.074235 40.397841 17.973827 39.828125 16.935547 L 43.318359 11.974609 A 1.0001 1.0001 0 0 0 43.207031 10.693359 L 39.306641 6.7929688 A 1.0001 1.0001 0 0 0 38.013672 6.6894531 L 33.052734 10.273438 C 32.009656 9.7017023 30.885686 9.2413677 29.697266 8.8964844 L 28.685547 2.8359375 A 1.0001 1.0001 0 0 0 27.699219 2 L 22.199219 2 z M 23.044922 4 L 26.853516 4 L 27.814453 9.7636719 A 1.0001 1.0001 0 0 0 28.556641 10.570312 C 30.07104 10.948913 31.478126 11.514935 32.675781 12.251953 A 1.0001 1.0001 0 0 0 33.785156 12.210938 L 38.494141 8.8085938 L 41.197266 11.511719 L 37.882812 16.224609 A 1.0001 1.0001 0 0 0 37.847656 17.324219 C 38.584675 18.521874 39.154586 19.937607 39.533203 21.357422 A 1.0001 1.0001 0 0 0 40.333984 22.085938 L 46 23.044922 L 46 26.857422 L 40.429688 27.814453 A 1.0001 1.0001 0 0 0 39.632812 28.542969 C 39.254196 29.962783 38.686237 31.378517 37.949219 32.576172 A 1.0001 1.0001 0 0 0 37.990234 33.685547 L 41.390625 38.394531 L 38.6875 41.097656 L 33.974609 37.78125 A 1.0001 1.0001 0 0 0 32.904297 37.732422 C 31.566632 38.496802 30.2627 39.053466 28.757812 39.429688 A 1.0001 1.0001 0 0 0 28.017578 40.21875 L 26.966797 45.900391 L 23.144531 45.900391 L 22.185547 40.232422 A 1.0001 1.0001 0 0 0 21.443359 39.429688 C 19.92896 39.051088 18.521874 38.485065 17.324219 37.748047 A 1.0001 1.0001 0 0 0 16.224609 37.78125 L 11.511719 41.097656 L 8.8066406 38.392578 L 12.113281 33.783203 A 1.0001 1.0001 0 0 0 12.167969 32.703125 C 11.403582 31.365465 10.846925 30.061529 10.470703 28.556641 A 1.0001 1.0001 0 0 0 9.6660156 27.814453 L 4 26.855469 L 4 23.056641 L 9.5546875 22.1875 A 1.0001 1.0001 0 0 0 10.371094 21.443359 C 10.749694 19.92896 11.313763 18.521874 12.050781 17.324219 A 1.0001 1.0001 0 0 0 12.017578 16.224609 L 8.7011719 11.511719 L 11.412109 8.8027344 L 16.125 12.117188 A 1.0001 1.0001 0 0 0 17.195312 12.167969 C 18.532978 11.403589 19.836909 10.846925 21.341797 10.470703 A 1.0001 1.0001 0 0 0 22.085938 9.6660156 L 23.044922 4 z M 25 17 C 20.570085 17 17 20.570085 17 25 C 17 29.429915 20.570085 33 25 33 C 29.429915 33 33 29.429915 33 25 C 33 20.570085 29.429915 17 25 17 z M 25 19 C 28.370085 19 31 21.629915 31 25 C 31 28.370085 28.370085 31 25 31 C 21.629915 31 19 28.370085 19 25 C 19 21.629915 21.629915 19 25 19 z"></path>
                                        </svg>

                                    </div>

                                </div>
                            }
                            <span className='teamName flex gap-2 items-center'>
                                <input type='text' name='TeamName' disabled={userDetails.email === currentUser.email ? false : true} className={`bg-transparent  ${userDetails.email === currentUser.email ? "hover:border hover:rounded-xl" : ""} w-fit text-center text-white text-2xl`} onChange={handleformChange} value={form.TeamName} />
                            </span>
                            <div className='text-white w-[50vw]'>
                                <input type='text' placeholder='Add a headline' spellCheck={false} rows={2} disabled={userDetails.email === currentUser.email ? false : true} name='description' className={`headline resize-none bg-transparent ${userDetails.email === currentUser.email ? "hover:border border-white hover:rounded-xl" : ""} w-full text-center text-lg`} onChange={handleformChange} value={form.description} /></div>
                            <div onClick={() => copyToClipboard()} className='flex text-gray-300 gap-1 items-center cursor-pointer'>
                                <img width="15" height="15" className='invert-[1]' src="https://img.icons8.com/material-rounded/24/link--v1.png" alt="link--v1" />
                                <span className='text-xs'>Popcorn/{currentUser.pageName}</span>
                            </div>
                            <div className='text-slate-400 self-center'>1 members ⁍ {currentUser.posts.length} posts</div>
                            {/* {currentUser.email !== userDetails.email &&
    <button ref={joinChannelButton} onClick={joinButton} className="bg-rose-950 text-rose-400 border border-rose-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
        <span className="bg-rose-400 shadow-rose-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        Join now
    </button>
} */}
                            {currentUser.email !== userDetails.email &&
                                userDetails.subscribers.includes(currentUser._id) ? "" :
                                <button ref={joinChannelButton} onClick={joinButton} className="bg-rose-950 text-rose-400 border border-rose-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                                    <span className="bg-rose-400 shadow-rose-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                    Join now
                                </button>
                            }


                        </div>
                        <div className='flex items-center text-white justify-center gap-10 my-2  '>
                            <button className='focus:font-bold focus:text-blue-300 focus:border-b-2 border-indigo-200' onClick={() => setnavstate(0)}>Home</button>
                            <button className='focus:font-bold focus:border-b-2 focus:text-blue-300  border-indigo-200' onClick={() => setnavstate(1)}>Tip</button>
                            <button className='focus:font-bold focus:border-b-2 focus:text-blue-300 border-indigo-200' onClick={() => setnavstate(2)}>About
                            </button>
                        </div>
                        <div id='post' ref={scrollTo} className='w-[100%] h-[1px] opacity-45 bg-white mb-5'></div>
                        {display &&
                            <>
                                <div className="create_posts w-[80%] mx-auto flex flex-col items-center justify-center gap-0 my-10">
                                    <span className='text-2xl my-2 self-start text-white' ref={postCreation}>Create a Post</span>
                                    <div className='flex w-full justify-around h-fit'>
                                        <div className='basis-[50%]   rounded-xl flex flex-col'>
                                            <input
                                                placeholder="Title*" name='postTitle' onChange={handlePostFormChanges}
                                                className="bg-slate-800 my-3 w-full border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff]  transition"
                                                type="text" required
                                            />
                                            <textarea
                                                name='postDescription'
                                                onChange={handlePostFormChanges}
                                                placeholder="Description*" rows={5}
                                                className="bg-slate-800 w-full my-3 border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff]  transition"
                                                type="text" required
                                            />
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" name='postMediaUrl' onChange={handleFileChange} type="file" />
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Video,Image and Audio Only</p>


                                        </div>
                                        <div className='basis-[40%] h-[400px] rounded-xl flex  gap-3 flex-col'>
                                            <input
                                                placeholder="Redirect URL ->https://example.com" pattern="https://.*" name='postRedirectURL' onChange={handlePostFormChanges}
                                                className="bg-slate-800 my-3 w-full border-2 border-[#3e3e3e] rounded-lg text-white px-3 py-3 text-base hover:border-[#fff]  transition"
                                                type="url"
                                            />
                                            <label className='text-white'>Visibility</label>
                                            <div
                                                className="flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none"
                                            >

                                                <label
                                                    className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                                                >
                                                    <input type="radio" onChange={handlePostFormChanges} name="postVisibility" value="public" className="peer hidden" />
                                                    <span
                                                        className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-white p-2 rounded-lg transition duration-150 ease-in-out"
                                                    >Public</span
                                                    >
                                                </label>

                                                <label
                                                    className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                                                >
                                                    <input type="radio" name="postVisibility" onChange={handlePostFormChanges} value="team" className="peer hidden" />
                                                    <span
                                                        className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-white p-2 rounded-lg transition duration-150 ease-in-out"
                                                    >Only Team</span
                                                    >
                                                </label>
                                            </div>





                                        </div>

                                    </div>
                                    <div className="w-full relative bottom-[40px] flex items-center justify-center cursor-pointer" >
                                        <div
                                            className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
                                        >
                                            <span
                                                className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"
                                            ></span>
                                            <span
                                                className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    className="w-5 h-5 text-green-400"
                                                >
                                                    <path
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        strokeWidth="2"
                                                        strokeLinejoin="round"
                                                        strokeLinecap="round"
                                                    ></path>
                                                </svg>
                                            </span>
                                            <span
                                                className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    className="w-5 h-5 text-green-400"
                                                >
                                                    <path
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        strokeWidth="2"
                                                        strokeLinejoin="round"
                                                        strokeLinecap="round"
                                                    ></path>
                                                </svg>
                                            </span>
                                            <span onClick={createPostandUpload}
                                                className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
                                            >Post Now!!</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </>}
                        <div className='flex '>
                            {navstate === 0 &&
                                <>
                                    <div key={navstate} className="posts w-[90%] sm:w-[80%] mx-auto flex flex-col gap-5 ">
                                        {userDetails.email === currentUser.email ?
                                            <span className='text-2xl text-yellow-300 my-2'>Your Recent Posts</span>
                                            : userDetails.subscribers.includes(currentUser._id) ?
                                                <span className='text-2xl my-2 text-yellow-200'>Recent Posts By {currentUser.TeamName}</span>
                                                : <span className='text-2xl my-2 text-yellow-200'>Public Posts By {currentUser.TeamName}</span>

                                        }
                                        {currentUser.posts.length === 0 &&
                                            <>
                                                <div className='flex items-center justify-center'>
                                                    <img src='/noData.png' width={280}></img>
                                                </div>
                                            </>
                                        }
                                        <div id='style-4' className="flex gap-5 overflow-x-auto ">

                                            {currentUser.posts.map((item, index) => {

                                                if (userDetails.subscribers.includes(currentUser._id)) {
                                                    return (
                                                        <div key={index} className='flex flex-col sm:justify-center lg:justify-center min-w-[clamp(280px,290px,60vw)] max-w-[90vw] md:max-w-[500px]  h-fit mb-2    sm:min-w-[350px] sm:min-h-[350px]  lg:min-w-[450px] lg:min-h-[450px] rounded-lg bg-slate-400 py-3'>
                                                            <div className='title px-4 m-1 font-bold text-xl'>{item.postTitle} </div>
                                                            <div className='title px-4 m-1 flex gap-1 text-sm'><img width="18" height="1" src="https://img.icons8.com/ios-filled/20/time.png" alt="time" />Just Now</div>
                                                            <pre className='title break px-4 m-1 text-lg whitespace-pre-line'>
                                                                {item.postDescription}
                                                            </pre  >
                                                            <div className='title px-4 m-1  text-xl'>
                                                                <img className='max-h-[400px] w-full object-contain' src={item.postMediaUrl} />
                                                            </div>
                                                            <div className='title px-6 my-4 text-sm flex gap-5 items-center' onClick={() => setlikes(!likes)}>
                                                                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" stroke={likes ? "red" : "black"} fill={likes ? "red" : "#64748B"} width="24" height="24" viewBox="0 0 24 24">
                                                                    <title>Like</title>
                                                                    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg>
                                                                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="26px" height="26" viewBox="0 0 24 24" version="1.1">

                                                                    <title>Comment</title>

                                                                    <g id="🔍-System-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                        <g id="ic_fluent_comment_add_24_regular" fill="#212121" fillRule="nonzero">
                                                                            <path d="M12.0222817,2.99927567 C11.7253991,3.46285541 11.4857535,3.96661073 11.3133148,4.50057151 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49985739,20.2505702 L12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5010736,12.2672297 C21.0520148,11.9799518 21.5566422,11.6160435 22.0008195,11.1896412 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L12.0222817,2.99927567 Z M17.5,1 C20.5375661,1 23,3.46243388 23,6.5 C23,9.53756612 20.5375661,12 17.5,12 C14.4624339,12 12,9.53756612 12,6.5 C12,3.46243388 14.4624339,1 17.5,1 Z M17.5,2.5 L17.4101244,2.50805567 C17.2060313,2.54509963 17.0450996,2.70603131 17.0080557,2.91012437 L17,3 L16.999,6 L14,6 L13.9101244,6.00805567 C13.7060313,6.04509963 13.5450996,6.20603131 13.5080557,6.41012437 L13.5,6.5 L13.5080557,6.58987563 C13.5450996,6.79396869 13.7060313,6.95490037 13.9101244,6.99194433 L14,7 L16.999,7 L17,10 L17.0080557,10.0898756 C17.0450996,10.2939687 17.2060313,10.4549004 17.4101244,10.4919443 L17.5,10.5 L17.5898756,10.4919443 C17.7939687,10.4549004 17.9549004,10.2939687 17.9919443,10.0898756 L18,10 L17.999,7 L21,7 L21.0898756,6.99194433 C21.2939687,6.95490037 21.4549004,6.79396869 21.4919443,6.58987563 L21.5,6.5 L21.4919443,6.41012437 C21.4549004,6.20603131 21.2939687,6.04509963 21.0898756,6.00805567 L21,6 L17.999,6 L18,3 L17.9919443,2.91012437 C17.9549004,2.70603131 17.7939687,2.54509963 17.5898756,2.50805567 L17.5,2.5 Z" id="🎨-Color">

                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>)
                                                }
                                                else {
                                                    if (item.postVisibility === "public") {
                                                        return (<div key={index} className='flex flex-col sm:justify-center lg:justify-center min-w-[clamp(280px,290px,60vw)] max-w-[90vw] md:max-w-[500px]  h-fit mb-2    sm:min-w-[350px] sm:min-h-[350px]  lg:min-w-[450px] lg:min-h-[450px] rounded-lg bg-slate-400 py-3'>
                                                            <div className='title px-4 m-1 font-bold text-xl'>{item.postTitle} </div>
                                                            <div className='title px-4 m-1 flex gap-1 text-sm'><img width="18" height="1" src="https://img.icons8.com/ios-filled/20/time.png" alt="time" />Just Now</div>
                                                            <pre className='title break px-4 m-1 text-lg whitespace-pre-line'>
                                                                {item.postDescription}
                                                            </pre  >
                                                            <div className='title px-4 m-1  text-xl'>
                                                                <img className='max-h-[400px] w-full object-contain' src={item.postMediaUrl} />
                                                            </div>
                                                            <div className='title px-6 my-4 text-sm flex gap-5 items-center' onClick={() => setlikes(!likes)}>
                                                                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" stroke={likes ? "red" : "black"} fill={likes ? "red" : "#64748B"} width="24" height="24" viewBox="0 0 24 24">
                                                                    <title>Like</title>
                                                                    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg>
                                                                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="26px" height="26" viewBox="0 0 24 24" version="1.1">

                                                                    <title>Comment</title>

                                                                    <g id="🔍-System-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                        <g id="ic_fluent_comment_add_24_regular" fill="#212121" fillRule="nonzero">
                                                                            <path d="M12.0222817,2.99927567 C11.7253991,3.46285541 11.4857535,3.96661073 11.3133148,4.50057151 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49985739,20.2505702 L12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5010736,12.2672297 C21.0520148,11.9799518 21.5566422,11.6160435 22.0008195,11.1896412 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L12.0222817,2.99927567 Z M17.5,1 C20.5375661,1 23,3.46243388 23,6.5 C23,9.53756612 20.5375661,12 17.5,12 C14.4624339,12 12,9.53756612 12,6.5 C12,3.46243388 14.4624339,1 17.5,1 Z M17.5,2.5 L17.4101244,2.50805567 C17.2060313,2.54509963 17.0450996,2.70603131 17.0080557,2.91012437 L17,3 L16.999,6 L14,6 L13.9101244,6.00805567 C13.7060313,6.04509963 13.5450996,6.20603131 13.5080557,6.41012437 L13.5,6.5 L13.5080557,6.58987563 C13.5450996,6.79396869 13.7060313,6.95490037 13.9101244,6.99194433 L14,7 L16.999,7 L17,10 L17.0080557,10.0898756 C17.0450996,10.2939687 17.2060313,10.4549004 17.4101244,10.4919443 L17.5,10.5 L17.5898756,10.4919443 C17.7939687,10.4549004 17.9549004,10.2939687 17.9919443,10.0898756 L18,10 L17.999,7 L21,7 L21.0898756,6.99194433 C21.2939687,6.95490037 21.4549004,6.79396869 21.4919443,6.58987563 L21.5,6.5 L21.4919443,6.41012437 C21.4549004,6.20603131 21.2939687,6.04509963 21.0898756,6.00805567 L21,6 L17.999,6 L18,3 L17.9919443,2.91012437 C17.9549004,2.70603131 17.7939687,2.54509963 17.5898756,2.50805567 L17.5,2.5 Z" id="🎨-Color">

                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>)
                                                    } else {
                                                        return <div key={index} className='flex items-center w-[80%] bg-slate-700 p-2 mx-auto text-white text-xl font-bold justify-center '>
                                                            Join the Channel to get exclusive post which are available for Channel Members Only!...
                                                        </div>
                                                    }
                                                }


                                            })}


                                        </div>

                                    </div>
                                </>
                            }
                            {navstate === 1 &&
                                
                                    <div  className='Supporters_Box flex flex-col  sm:flex-row w-[90%] sm:w-[80%] mx-auto gap-3 py-10  '>
                                        <div className={`supporters w-full  sm:w-1/2 bg-slate-900  rounded-lg p-5`}>
                                            <h2 className='text-2xl font-bold my-5 text-orange-200'>Supporters</h2>
                                            <ul key={navstate*2.3} id='style-4' className={`mx-5 ${Payments.length === 0 ? "h-fit " : "h-[300px]"} overflow-y-auto`}>
                                                {Payments.length === 0 && <div className='text-white '>No Payment Received Yet</div>}
                                                {Payments.map((item,index) => {
                                                    if (item.done) {
                                                        return (
                                                        
                                                                <li key={item._id} className='my-2 text-lg flex gap-2 text-white items-center '><img src={`user${Math.floor(Math.random() * 5) + 1}.gif`} width={50} /><div className='flex flex-wrap gap-x-1'><span className='text-blue-300'> {item.name}</span><span > donated </span><span className='font-bold'>{item.amount}rs</span>with message <span></span> <span className='text-yellow-200'>"{item.message}"</span></div></li>
                                                            )
                                                    }

                                                })}
                                            </ul>
                                        </div>
                                        <div className='supporters_payment w-full  sm:w-1/2 bg-slate-900 rounded-lg  p-5 h-fit'>
                                            <h2 className='font-bold text-2xl my-5 text-orange-200'>Make a Payment</h2>
                                            <div className='flex flex-col gap-2'>
                                                <input type='text' onChange={handleChange} name="name" value={paymentform.name} placeholder='Enter Name' className='w-full p-3 bg-slate-800 rounded-lg'></input>
                                                <input type='text' onChange={handleChange} value={paymentform.messgae} name='message' placeholder='Enter Message' className='w-full p-3 bg-slate-800 rounded-lg'></input>
                                                <input type='number' onChange={handleChange} value={paymentform.amount} name="amount" placeholder='Enter Amount' className='w-full p-3 bg-slate-800 rounded-lg'></input>
                                                <button disabled={currentUser.razorpayId ? false : true} onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className={`cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600
border-b-[4px] 
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] ${currentUser.razorpayId ? "hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]" : "hover:cursor-not-allowed"}`}>
                                                    Pay
                                                </button>
                                            </div>
                                            <div className='flex gap-5 mt-5 text-white'>
                                                <button disabled={currentUser.razorpayId ? false : true} className={`  ${currentUser.razorpayId ? "" : "hover:cursor-not-allowed"} p-3 bg-slate-800  rounded-xl `} onClick={() => pay(50 * 100)}>Pay 50&#8377;</button>
                                                <button disabled={currentUser.razorpayId ? false : true} className={`  ${currentUser.razorpayId ? "" : "hover:cursor-not-allowed"} p-3 bg-slate-800  rounded-xl `} onClick={() => pay(500 * 100)}>Pay 500&#8377;</button>
                                                <button disabled={currentUser.razorpayId ? false : true} className={`  ${currentUser.razorpayId ? "" : "hover:cursor-not-allowed"} p-3 bg-slate-800  rounded-xl `} onClick={() => pay(1000 * 100)}>Pay 100&#8377;</button>
                                            </div>
                                        </div>

                                    </div>
                                
                            }
                            {navstate === 2 &&
                                <>
                                    <div key={navstate} className='flex flex-col gap-4 my-10 text-white justify-center items-center mx-auto aboutBox h-[340px] bg-slate-900 w-[60vw]'>
                                        <Image  src='https://c5.patreon.com/external/creator_onboarding/about-module.png' width={200} height={200} ></Image>
                                        <h1>Introduce yourself</h1>
                                        <span className='w-[70%] text-center'>Help people coming to your page get to know you. Share more about who you are, what you create, and why you're on Popcorn! </span>
                                        <button className='p-2 border bg-transparent rounded-2xl' onClick={toogleDialog}>Add Details</button>
                                        <dialog className='flex items-center justify-center' ref={dialogRef}>
                                            
                                            heeko
                                        </dialog>
                                    </div>
                                </>

                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PaymentPage
