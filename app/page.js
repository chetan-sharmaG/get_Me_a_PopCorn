import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <div className="absolute z-[0] bottom-0 left-0 right-0 top-0 "></div>    */}
      <div className="flex flex-col justify-center text-white items-center h-[44vh] gap-4">
        <div className="flex items-center font-bold text-5xl" >Buy Me A PopCorn <img src="/popcorn.gif" width={50}></img></div>
        <p>
          A Crowdfunding Platform for creators. Get Funded by your fans and followers.
        </p>
        <div className="flex gap-2">
          <button type="button" className="text-white bg-gradient-to-r  from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get Started</button>
          <button type="button" className="text-white bg-gradient-to-r  from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>

      </div>
      <div className="bg-blue-700 h-1 opacity-20"></div>

      <div className=" text-white py-10 flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold">Your fans can buy you popcorn</h1>
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
          <img src="/consult.gif" width={50}></img>
            <p>Fund Yourseldf</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-700 h-1 opacity-20"></div>
      
      <div className=" text-white py-10 flex flex-col gap-8 items-center">
        <h1 className="text-center text-2xl font-bold">Learn more about Us</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/fjHO4fAfCf0?si=7LOXPiktDd4oHGaC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
