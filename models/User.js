
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    pageName: { type: String }, //username is same as pageName
    TeamName: { type: String },
    
    description: { type: String, default: "About you" },
    profilePic: { type: String },
    coverPic: { type: String },
    isfan: { type: String, required: false, default: " che" },
    firstTimeSetupDone: { type: Boolean, default: false },
    razorpayId: { type: String },
    razorpaySecret: { type: String },
    post: { type: Number, default: 0 },
    firstTimeLogin: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

});



export default mongoose.models.User || model("User", UserSchema);