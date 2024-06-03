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
    var data = JSON.parse(JSON.stringify(u))
    
    return data
}

export const fetchPayments = async (username) => {

    await connectDB()
    let p = await Payment.find({ to_user: username }).sort({ amount: -1 }).lean()
    var data = JSON.parse(JSON.stringify(p))
    
    return data
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
            TeamName: TeamName,
            isfan: false
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


export const uploadFile = async (email, file) => {

    await connectDB()
    const data = await User.findOneAndUpdate({ email: email }, { $set: { coverPic: file } }, { new: true })
    console.log(data)

}

export const updatePageDetails = async (email, form) => {

    await connectDB()
    const data = await User.findOneAndUpdate({ email: email }, { $set: form }, { new: true })
    console.log(data)
    if (data) {
        return true
    }
    else {
        return false
    }

}

export const createPost = async (email, form) => {

    await connectDB()
    const data = await User.findOneAndUpdate({ email: email }, {
        $push: {
            posts: form
        }
    }
        , { new: true })
    console.log(data)
    if (data) {
        return true
    }
    else {
        return false
    }

}
export const joinAsFan = async (email) => {

    await connectDB()
    const updatedDetail = await User.findOneAndUpdate({ email: email }, {
        $set: {
            firstTimeSetupDone: true,
            isfan: true
        }
    }, { new: true })
    if (updatedDetail) {
        return true
    }
    else {
        return false
    }
}

export const subscribeToCreator = async (email, creator_id) => {
    await connectDB()
    const addCreator = await User.findOneAndUpdate({ email: email }, {
        $addToSet: {
            subscribed: creator_id
        }
    }, { new: true })
    if (addCreator) {
        return true
    }
    else {
        return false
    }
}
export const creatorsDetails = async () => {
    await connectDB()
    const getUsers = await User.find({ isfan: false }, { pageName: 1, TeamName: 1, description: 1, profilePic: 1, coverPic: 1 });
    var data = JSON.parse(JSON.stringify(getUsers))
    console.log(data)
    return data


}

export const searchUser = async (TeamName) => {
    await connectDB()
    const getUsers = await User.find(
        {
            TeamName: {
                $regex: TeamName, $options: "i"
            }
        }, { pageName: 1, TeamName: 1, description: 1, profilePic: 1, coverPic: 1 })

    var data = JSON.parse(JSON.stringify(getUsers))
    console.log(data)
    return data

}