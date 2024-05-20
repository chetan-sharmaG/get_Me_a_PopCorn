import React from 'react'

const username = ({ params }) => {
  return (
    <>
      <div className='cover w-full relative'>
        <img className='w-full  object-cover h-[250]' src='https://c10.patreonusercontent.com/4/patreon-media/p/campaign/157242/75fb679851744f87bdba7c2ef921762e/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/1.jpg?token-time=1717459200&token-hash=GWWPaIUcgbL4SA0sqVPpMeUdqHjvwcMVs5OzwJipyic%3D' />
        <div className='absolute -bottom-10 right-[47%] '>
          <img className='rounded-xl' width={100} height={100} src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2v8jGQFEHwDE0bEIm2Sofs-0n5RUWyiNtY_JQw46IozVB-YPU' />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center my-16 gap-2' >
        <span> {params.username}</span>
        <div className='text-slate-400'>Creating Trailer Reactions, Movie Reviews, Short Films, Vlogs an</div>
        <div className='text-slate-400 '>28,239 members2,368 posts</div>

      </div>
      <div className='Supporters_Box flex w-[80%] mx-auto gap-3 my-16'>
        <div className='supporters w-1/2 bg-slate-900  rounded-lg p-5'>
          <h2 className='text-2xl font-bold my-5'>Supporters</h2>
          <ul id='style-4' className='mx-5 h-[300px] overflow-y-auto'>
            <li className='my-2 text-lg flex gap-2 items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50}/>Chetan donated 30rs with message ""</li>
            
           


          </ul>
        </div>
        <div className='supporters_payment bg-slate-900 rounded-lg w-1/2 p-5 h-fit'>
          <h2 className='font-bold text-2xl my-5'>Make a Payment</h2>
          <div className='flex flex-col gap-2'>
            <input type='text' placeholder='Enter Name' className='w-full p-3 bg-slate-800 rounded-lg'></input>
            <input type='text' placeholder='Enter Message' className='w-full p-3 bg-slate-800 rounded-lg'></input>
            <input type='number' placeholder='Enter Amount' className='w-full p-3 bg-slate-800 rounded-lg'></input>
            <button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              Pay
            </button>
          </div>
          <div className='flex gap-5 mt-5'>
            <button className='p-3 bg-slate-800 rounded-xl'>Pay 50&#8377;</button>
            <button className='p-3 bg-slate-800 rounded-xl'>Pay 500&#8377;</button>
            <button className='p-3 bg-slate-800 rounded-xl'>Pay 100&#8377;</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default username
