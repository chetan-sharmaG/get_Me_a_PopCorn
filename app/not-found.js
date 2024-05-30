import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex h-[100vh] w-[100vw] items-center flex-col justify-center '>
            <span className='text-6xl'>404: No such user  Found</span>
            <a href='/' className='bg-orange-200 rounded-lg w-fit p-3 m-3 text-black'> &larr; Go Back To Home</a>
        </div>
    )
}