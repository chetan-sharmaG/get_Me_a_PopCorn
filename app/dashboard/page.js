"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
const page = () => {
    const { data: session } = useSession()
    if(!session) {
        const router = useRouter()
        router.push('/login')
  }
  return (
    <>
    In dashboard
    </>
  )
}

export default page
