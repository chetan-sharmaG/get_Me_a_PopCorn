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

  return (
    <>
      <div className='bg-slate-800'>
        <Navbar/>
        <PaymentPage username={params.username} />
      </div>
    </>
  )
}

export default username
