import mongoose from "mongoose";

const bioSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    gender: {
        type: String,
        required: [true, "Please provide gender"],
    },
    date_of_birth: {
        type: Date,
        required: [true, "Please provide date of birth"],
    },
    blood_group: {
        type: String,
        required: [true, "Please provide blood group"],
    },
    father_name: {
        type: String,
        required: [true, "Please provide father name"],
    },
    mother_name: {
        type: String,
        required: [true, "Please provide mother name"],
    },
    father_occupation: {
        type: String,
        required: [true, "Please provide father occupation"],
    },
    flag: {
        type: String,
        required: [true, ""],
    },
    skin_color: {
        type: String,
        required: [true, "Please provide skin color"],
    },
    mother_occupation: {
        type: String,
        required: [true, "Please provide mother occupation"],
    },
    brothers: {
        type: Number,
        required: [true, "Please provide number of brothers"],
    },
    sisters: {
        type: Number,
        required: [true, "Please provide number of sisters"],
    },
    education: {
        type: String,
        required: [true, "Please provide latest education"],
    },
    marital_status: {
        type: String,
        required: [true, "Please provide marital status"],
    },
    occupation: {
        type: String,
        required: [true, "Please provide occupation"],
    },
    religion: {
        type: String,
        required: [true, "Please provide religion"],
    },
    height: {
        type: Number,
        required: [true, "Please provide height"],
    },
    weight: {
        type: Number,
        required: [true, "Please provide weight"],
    },
    photo: {
        type: String,
        required: [true, "Please provide photo"],
    },
    guardian: {
        type: String,
        required: [true, "Please provide a guardian"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    phone: {
        type: String,
        required: [true, "Please provide phone number"],
    },
    street: {
        type: String,
        required: [true, "Please provide street"],
    },
    city: {
        type: String,
        required: [true, "Please provide city"],
    },
    state: {
        type: String,
        required: [true, "Please provide state"],
    },
    postal_code: {
        type: String,
        required: [true, "Please provide postal code"],
    },
    social_media: {
        type: String,
    },
    country: {
        type: String,
        required: [true, "Please provide country"],
    },
    message: {
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    sharedWith: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Bio = mongoose.models.bio || mongoose.model("bio", bioSchema);

export default Bio;
