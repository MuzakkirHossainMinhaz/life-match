import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: "https://i.ibb.co/27d9HzN/profile.png",
    },
    fullname: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    phone: {
        type: String,
        default: "+880",
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
