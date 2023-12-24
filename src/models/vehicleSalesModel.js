import mongoose from "mongoose";

const vehicleSalesSchema = new mongoose.Schema({
    vehicle_name: {
        type: String,
        required: [true, "Please provide vehicle name"],
    },
    vehicle_model: {
        type: String,
        required: [true, "Please provide vehicle model"],
    },
    photo: {
        type: String,
        required: [true, "Please provide a photo"],
    },
    date_of_purchase: {
        type: Date,
        required: [true, "Please provide a date"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
    },
    docs_correct: {
        type: String,
        required: [true, "Please provide a docs correct"],
    },
    vehicle_type: {
        type: String,
        required: [true, "Please provide vehicle correct"],
    },
    seller_type: {
        type: String,
        required: [true, "Please provide seller type"],
    },
    website_url: {
        type: String,
    },
    email: {
        type: String,
        required: [true, ""],
    },
    phone: {
        type: String,
        required: [true, "Please provide a number"],
    },
    street: {
        type: String,
        required: [true, "Please provide a street"],
    },
    city: {
        type: String,
        required: [true, "Please provide a city"],
    },
    state: {
        type: String,
        required: [true, "Please provide a state"],
    },
    postal_code: {
        type: String,
        required: [true, "Please provide a postal code"],
    },
    country: {
        type: String,
        required: [true, "Please provide a country"],
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
    },
    flag: {
        type: String,
        required: [true, ""],
    },
});

const VehicleSales = mongoose.models.vehicles || mongoose.model("vehicles", vehicleSalesSchema);

export default VehicleSales;
