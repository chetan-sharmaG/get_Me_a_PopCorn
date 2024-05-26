"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentForm) => {
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })


    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }

    let x = await instance.orders.create(options)

    await Payment.create({
        oid: x.id, amount: amount / 100, to_user: to_username, name: paymentForm.name, message: paymentForm.message
    })

    return x
}

export const fetchUser = async (username) => {

    await connectDB()
    let u = await User.findOne({ pageName: username })
    if (!u) {
        return
    }
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchPayments = async (username) => {

    await connectDB()
    let p = await Payment.find({ to_user: username }).sort({ amount: -1 }).lean()
    return p
}

export const checkIfUserExist = async (username) => {

    await connectDB()
    let u = await User.findOne({ pageName: username })
    if (u) {
        return true
    }
    else {
        return false
    }

}

export const checkIfFirstTimeLogin = async (username) => {
    await connectDB()

}

export const PageCreation = async (email, newpageName, TeamName) => {

    await connectDB()
    const updatedDetail = await User.findOneAndUpdate({ email: email }, {
        $set: {
            pageName: newpageName,
            firstTimeSetupDone: true,
             TeamName: TeamName
        }
    }, { new: true })
    if (updatedDetail.TeamName === TeamName && updatedDetail.pageName === newpageName) {
        return true
    }
    else {
        return false
    }

}

export const RazorPayDetails = async (email, razorpayId, razorpaySecret) => {
    await connectDB()
    const updatedDetail = await User.findOneAndUpdate({ email: email }, { $set: { razorpayId: razorpayId, razorpaySecret: razorpaySecret } }, { new: true })
    if (updatedDetail.razorpayId === razorpayId && updatedDetail.razorpaySecret === razorpaySecret) {
        return true
    } else {
        return false
    }



}


export const uploadFile = async(email,file)=>{

    await connectDB()
    const data = await User.findOneAndUpdate({email:email},{$set:{coverPic:file }},{new:true})
    console.log(data)

}

export const updatePageDetails = async(email,form)=>{

    await connectDB()
     const data = await User.findOneAndUpdate({email:email},{$set:form},{new:true})
     console.log(data)
     if(data){
        return true
     }
     else{
        return false 
     }

}