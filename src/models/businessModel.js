import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    products_quantity: {
        type: Number,
        required: [true, "Please provide a photo"],
    },
    products_price: {
        type: Number,
        required: [true, "Please provide a photo"],
    },
    social_media: {
        type: String,
    },
    company_name: {
        type: String,
    },
    company_registered_address: {
        type: String,
    },
    company_website_url: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    email: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    phone: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    street: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    city: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    state: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    postal_code: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    country: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    flag: {
        type: String,
        required: [true, ""],
    },
    product_name: {
        type: String,
        required: [true, "Please provide product name"],
    },
});

const Business = mongoose.models.business || mongoose.model("business", businessSchema);
export default Business;
