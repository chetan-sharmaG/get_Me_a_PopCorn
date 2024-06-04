"use client"
import React, { useEffect, useState } from 'react'
import { creatorsDetails } from '@/actions/useractions';
import { searchUser } from '@/actions/useractions';
import Navbar from '@/components/Navbar';
const Explore = () => {

    const [allUsers, setallUsers] = useState([])
    const [nouser, setnouser] = useState(false)
    const [cacheUsers, setcacheUsers] = useState([])
    const [searchText, setSearchText] = useState("")

    const navDetails = {
        bg: "bg-slate-700",
        text: "text-white"
    }

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers() {

        let data = await creatorsDetails();
        setallUsers(data)
        setcacheUsers(data)
    }

    const handleChange = (e) => {
        if (e.target.value === "") {
            setallUsers(cacheUsers)
            setnouser(false)
        }
        const value = e.target.value
        setSearchText(value)
        console.log(searchText)
    }

    const searchUsers = async () => {
        let a = await searchUser(searchText)
        if (a.length === 0) {
            setnouser(true)
        }
        setallUsers(a)
    }
    return (
        <>
            <Navbar color={navDetails} />
            <div className='w-[80vw] sm:w-[55vw] mt-[15vh] mx-auto flex-col gap-5 flex my-10'>
                <h1 className='text-2xl font-extrabold font-poppins'>A Hundred creators have a home on PopCorn</h1>
                <div className='relative w-full flex flex-col items-center'>
                    <input
                        autoCorrect={true}
                        onChange={handleChange}
                        value={searchText}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchUsers()
                            }
                        }}
                        className="bg-zinc-200 w-full h-[55px] text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg pl-10 focus:shadow-rose-400"
                        autoComplete="off"
                        placeholder="Find a Creator..."
                        name="text"
                        type="text"
                    />
                    <span className="absolute right-[4px] top-[3px] cursor-pointer" onClick={searchUsers} >
                        <button
                            className="relative right-0 py-3  px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                        >
                            Search
                        </button>
                    </span>
                    <span className="absolute left-[6px]  top-[15px] cursor-pointer" onClick={searchUsers} >
                        <lord-icon
                            src="https://cdn.lordicon.com/anqzffqz.json"
                            trigger="loop"
                            style={{ "width": "30px", "height": "30px" }}>
                        </lord-icon>


                    </span>

                </div>
                <div className={`cards flex sm:flex-row gap-y-10 flex-col w-full sm:flex-wrap ${allUsers.length !== 1 ? "justify-center" : ""} gap-5  rounded-xl `}>
                    {nouser && <>
                        <div className='w-[80vw] h-[200px] mt-20 items-center justify-center flex flex-col'>
                            <img src='/searchError.jpg' className='w-full h-[200px] object-contain'></img>
                            <span>Please try searching for other keywords</span>
                        </div>

                    </>}
                    {
                        allUsers.map((items, index) => {
                            return (
                                <>
                                    {index === 9 && "hi"}
                                    <a href={`/${items.pageName}`} >
                                        <div key={index} className={`bg-white shadow-2xl relative  w-full h-[260px] flex flex-col sm:w-[250px]  rounded-xl sm:h-[340px]`}>
                                            <div className='w-full  h-[35%] rounded-t-xl relative  bg-gray-400'>
                                                <img src={items.profilePic} className='w-full rounded-t-xl h-full object-cover'></img>
                                                <div className='rounded-full absolute bottom-[-15px] left-[20px]  h-[60px] w-[60px]'>
                                                    <img src={items.profilePic} className='object-cover rounded-full w-full h-full'></img>
                                                </div>
                                            </div>
                                            <span className='mt-4 px-4 h-[10%] font-bold text-lg font-poppins'>{items.TeamName}</span>
                                            <p className='h-[30%] w-full px-4 block text-sm line-clamp-1 whitespace-pre-line text-ellipsis overflow-hidden'>
                                                {items.description}
                                            </p>
                                            <span className=' absolute right-[10px] p-1 cursor-pointer bottom-[10px] rounded-full border border-black w-fit '>View Page</span>
                                        </div>
                                    </a>
                                </>)
                        })
                    }
                    {/* <div className='bg-white shadow-md flex flex-col w-[250px]  rounded-xl h-[340px]'>
                        <div className='w-full rounded-t-xl h-[35%] relative  bg-gray-400'>
                            <div className='rounded-full absolute bottom-[-15px] left-[20px] bg-red-400 h-[60px] w-[60px]'></div>
                        </div>
                        <span className='mt-4 px-2 h-[10%]'>Chetan Sharma</span>
                        <p className='max-h-[35%] w-full px-2 block whitespace-pre-line text-ellipsis overflow-hidden'>In web browsers, if you double-click on some text it will be selected/highlighted. This property can be used to prevent this In web browsers, if you double-click on some text it will be selected/highlighted. This property can be used to prevent thisbrowsers, if you double-click on some text it will be selected/highlighted. This property can be used to prevent this In web browsers, if you double-click on some text it will be selected/highlighted. This property can be used to prevent this.</p>
                        <span className=' self-end mt-2 px-1 mr-2 rounded-full border border-black w-fit '>View Page</span>
                    </div> */}


                </div>
            </div>
        </>
    )
}

export default Explore
