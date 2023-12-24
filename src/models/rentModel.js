import mongoose from "mongoose";

const rentSchema = new mongoose.Schema({
    area: {
        type: String,
        required: [true, "Please provide area (sq. ft.)"],
    },
    land_type: {
        type: String,
        required: [true, "Please provide the land type"],
    },
    house_name: {
        type: String,
        required: [true, "Please provide house name"],
    },
    advance_pay: {
        type: Number,
        required: [true, "Please provide advance pay"],
    },
    monthly_rent: {
        type: Number,
        required: [true, "Please provide monthly rent"],
    },
    room: {
        type: Number,
        required: [true, "Please provide number of rooms"],
    },
    bathroom: {
        type: Number,
        required: [true, "Please provide number of bathrooms"],
    },
    kitchen: {
        type: Number,
        required: [true, "Please provide number of kitchens"],
    },
    balcony: {
        type: Number,
        required: [true, "Please provide number of balcony"],
    },
    photo: {
        type: String,
        required: [true, "Please upload a photo"],
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
    country: {
        type: String,
        required: [true, "Please provide country"],
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
    },
    flag: {
        type: String,
        required: [true, ""],
    },
});

const Rent = mongoose.models.rents || mongoose.model("rents", rentSchema);

export default Rent;
