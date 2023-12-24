import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    property_owner: {
        type: String,
        required: [true, "Please provide property owner name"],
    },
    property_partners: {
        type: Number,
        required: [true, "Please provide the number of partners"],
    },
    property_address: {
        type: String,
        required: [true, "Please provide the property address"],
    },
    property_name: {
        type: String,
        required: [true, "Please provide the property name"],
    },
    selling_price: {
        type: Number,
        required: [true, "Please provide selling price"],
    },
    property_type: {
        type: String,
        required: [true, "Please provide property type"],
    },
    residential: {
        type: String,
        required: [true, "Please provide residential"],
    },
    name: {
        type: String,
        required: [true, "Please provide the name"],
    },
    social_media: {
        type: String,
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

const Sales = mongoose.models.sales || mongoose.model("sales", salesSchema);

export default Sales;
