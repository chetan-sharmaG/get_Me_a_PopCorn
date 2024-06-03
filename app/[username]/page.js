import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
// import connectDB from '@/db/connectDb'
import { fetchUser } from '@/actions/useractions'
import Navbar from '@/components/Navbar'
const username = async ({ params }) => {

  let u = await fetchUser(params.username)
  if (!u) {
    notFound()
  }
  const navDetails = {
    bg:"bg-slate-700",
    text:"text-white"
  }
  return (
    <>
      <div className='bg-slate-800'>
        <Navbar color={navDetails}/>
        <PaymentPage username={params.username} />
      </div>
    </>
  )
}

export default username
