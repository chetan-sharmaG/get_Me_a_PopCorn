import Image from "next/image";
import React from "react";
import HomeScreen from "@/components/HomeScreen";
export default function Home() {
  return (
    <>
      {/* <div className="absolute z-[0] bottom-0 left-0 right-0 top-0 "></div>    */}

      {/* <div className="flex  relative flex-col bg-white justify-center p-10 text-black  h-[550px] gap-4">
        <Image src="/background.png" className="  w-full" width={800} height={600}></Image>
        <div className="flex w-3/5 text-balance text-center self-center absolute top-0 z-10 items-center whitespace-pre-line font-bold text-5xl" >
          All you need to make money
          doing what you love
          <Image src="/popcorn.gif" width={50} height={50}></Image>
        </div>
        <p>
          A Crowdfunding Platform for creators. Get Funded by your fans and followers.
        </p>
        <div className="flex gap-2">
          <button type="button" className="text-white bg-gradient-to-r  from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get Started</button>
          <a href="/about-us"><button type="button" className="text-white bg-gradient-to-r  from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></a>
        </div>

      </div> */}

      <HomeScreen />
      <div className="relative bg-blue-700 h-1 opacity-20"></div>
      <div className=" text-black py-10 flex flex-col gap-8">
        <h1 className=' bg-gradient-to-r from-slate-900 via-orange-500 to-indigo-400 relative z-10 self-center text-xl  sm:text-xl md:text-2xl font-semibold  w-[80vw] md:w-[40%]  font-poppins text-center text-transparent inline-block bg-clip-text'>Fund your creative work</h1>
        <div className="flex gap-5 justify-evenly ">
          <div className="item  space-y-2 flex flex-col items-center justify-center">
            <lord-icon
              src="https://cdn.lordicon.com/hrjifpbq.json"
              trigger="loop"
              delay="500"
              colors="primary:#a5e830"
              style={{ width: "50px", height: "50px" }}>
            </lord-icon>
            <p className="font-bold">Fund Yourseldf</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <lord-icon
              src="https://cdn.lordicon.com/yfrgwbag.json"
              trigger="loop"
              state="loop-cycle"
              style={{ width: "50px", height: "50px" }}>
            </lord-icon>
            <p>Fund Yourseldf</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <Image src="/consult.gif" width={50} height={50}></Image>
            <p>Fund Yourseldf</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      {/* <div className="bg-blue-700 h-1 opacity-20"></div> */}
      <div className="w-[80vw]  mx-auto flex flex-col gap-5 my-10 items-center justify-center p-5">
        <div className="flex flex-col gap-0 items-center justify-center">
          <span className="font-bold text-lg text-slate-600">POSTS, AUDIO & EMAIL</span>
          <span className="font-bold text-4xl text-slate-800">Publish your best work</span>
        </div>
        <span className="text-xl font-bold text-slate-600 w-[80%]">Buy Me a Coffee makes it easy to publish free and exclusive content. Try different formats such as audio, and make it members-only to drive more memberships.</span>
        <img src="https://cdn.buymeacoffee.com/assets/img/homepage/images/posts_v8.png" className="w-[80%]"></img>
      </div>
      <div className=" text-slate-600 py-10 flex flex-col gap-8 items-center">
        <h1 className="text-center text-2xl font-bold">Learn more about Us</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/fjHO4fAfCf0?si=7LOXPiktDd4oHGaC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
