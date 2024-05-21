"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import Script from 'next/script'
import { fetchPayments, initiate ,fetchUser} from '@/actions/useractions'

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [searchResult, setsearchResult] = useState(null)
    const [Payments, setPayments] = useState({})

    useEffect(() => {
      getData()
    
    }, [])
    
    const handleChange =(e)=>{

        setpaymentform({...paymentform,[e.target.name]:e.target.value})
        console.log(paymentform)
    }

    const getData =async()=>{

            let u = await fetchUser(username)
            setsearchResult(u?false:true)
            setcurrentUser(u)
            let dbPayments = await fetchPayments(username)
            setPayments(dbPayments)
            console.log(u,dbPayments)

    }   

    const pay = async(amount) => {

        let a = await initiate(amount,username,paymentform)
        let orderId =a.id
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


    return (
        <>
            
            {/* <button id="rzp-button1">Pay</button> */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
           {currentUser &&
           <>
            <div className='cover w-full relative'>
                <img className='w-full  object-fill h-[400px]' src={currentUser.coverPic} />
                <div className='absolute bottom-[-53px] left-[50%] translate-x-[-50%]'>
                    <img className='rounded-xl object-cover h-[150px] w-[150px]'  src={currentUser.profilePic} />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center my-16 gap-2' >
                <span> @{username}</span>
                <div className='text-slate-400'>Creating Trailer Reactions, Movie Reviews, Short Films, Vlogs an</div>
                <div className='text-slate-400 '>28,239 members2,368 posts</div>

            </div>
            <div className='Supporters_Box flex w-[80%] mx-auto gap-3 my-16'>
                <div className='supporters w-1/2 bg-slate-900  rounded-lg p-5'>
                    <h2 className='text-2xl font-bold my-5'>Supporters</h2>
                    <ul id='style-4' className='mx-5 h-[300px] overflow-y-auto'>
                        <li className='my-2 text-lg flex gap-2 items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                        <li className='my-2 text-lg flex items-center'><img src='mammoth-unscreen.gif' width={50} />Chetan donated 30rs with message ""</li>
                    </ul>
                </div>
                <div className='supporters_payment bg-slate-900 rounded-lg w-1/2 p-5 h-fit'>
                    <h2 className='font-bold text-2xl my-5'>Make a Payment</h2>
                    <div className='flex flex-col gap-2'>
                        <input type='text' onChange={handleChange} name="name" value={paymentform.name} placeholder='Enter Name' className='w-full p-3 bg-slate-800 rounded-lg'></input>
                        <input type='text' onChange={handleChange} value={paymentform.messgae} name='message' placeholder='Enter Message' className='w-full p-3 bg-slate-800 rounded-lg'></input>
                        <input type='number'onChange={handleChange} value={paymentform.amount} name="amount" placeholder='Enter Amount' className='w-full p-3 bg-slate-800 rounded-lg'></input>
                        <button  onClick={()=>pay(Number.parseInt(paymentform.amount)*100)} className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                            Pay
                        </button>
                    </div>
                    <div className='flex gap-5 mt-5'>
                        <button className='p-3 bg-slate-800 rounded-xl' onClick={()=>pay(50 *100)}>Pay 50&#8377;</button>
                        <button className='p-3 bg-slate-800 rounded-xl'  onClick={()=>pay(500 *100)}>Pay 500&#8377;</button>
                        <button className='p-3 bg-slate-800 rounded-xl' onClick={()=>pay(1000 *100)}>Pay 100&#8377;</button>
                    </div>
                </div>

            </div>
           </>
           }
        </>
    )
}

export default PaymentPage
