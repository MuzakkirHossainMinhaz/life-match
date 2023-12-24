"use client";

import React, { useEffect, useState } from "react";
import { styles } from "@/app/styles/styles";
import Link from "next/link";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import { Country, State, City } from "country-state-city";

const initialState = {
    vehicle_name: "",
    vehicle_model: "",
    photo: "",
    date_of_purchase: "",
    price: 0,
    docs_correct: "",
    vehicle_type: "",
    seller_type: "",
    website_url: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    message: "",
    flag: "",
};

const VehicleSales = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState("");

    const [country, setCountry] = useState("");
    const [countryName, setCountryName] = useState("");
    const [flag, setFlag] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data.email);
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleVehicleSales = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (
            image !== null &&
            (image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png")
        ) {
            const photo = new FormData();
            photo.append("image", image);

            const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_STORAGE_KEY}`;
            const response = await fetch(url, { method: "post", body: photo });
            const imgData = await response.json();
            data.photo = imgData.data.url.toString();
        }

        data.date_of_purchase = new Date(data.date_of_purchase);
        data.email = user;
        if (data.city === "") {
            data.city = data.state;
        }

        axios
            .post("/api/vehicle/register", data)
            .then(() => {
                router.push("/create", undefined, { shallow: true });
                setLoading(false);
                toast.success("Vehicle data has been registered!");
            })
            .catch(() => toast.error("Something went wrong!"));
        setLoading(false);
    };

    return (
        <div className="container text-gray-800 dark:text-white mx-auto p-5 md:p-10">
            <Link className="flex items-center gap-1" href="/create">
                <IoMdArrowRoundBack /> Back
            </Link>
            <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium lg:font-semibold text-center mt-2">
                    Add Vehicle Data for Sales
                </h2>
            </div>
            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center mt-52 min-h-screen">
                        {" "}
                        <Loader />{" "}
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleVehicleSales}>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label htmlFor="vehicle_name" className="block text-sm font-medium leading-6">
                                    Vehicle Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="vehicle_name"
                                        name="vehicle_name"
                                        type="text"
                                        required
                                        value={data.vehicle_name}
                                        onChange={(e) => setData({ ...data, vehicle_name: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="vehicle_model" className="block text-sm font-medium leading-6">
                                    Vehicle Model
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="vehicle_model"
                                        name="vehicle_model"
                                        type="text"
                                        required
                                        value={data.vehicle_model}
                                        onChange={(e) => setData({ ...data, vehicle_model: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="photo" className="block text-sm font-medium leading-6">
                                    Photo
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="photo"
                                        name="photo"
                                        type="file"
                                        required
                                        onChange={handleImageChange}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="date_of_purchase" className="block text-sm font-medium leading-6">
                                    Date of Purchase
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="date_of_purchase"
                                        name="date_of_purchase"
                                        type="date"
                                        required
                                        value={data.date_of_purchase}
                                        onChange={(e) => setData({ ...data, date_of_purchase: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium leading-6">
                                    Vehicle Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        required
                                        value={data.price}
                                        onChange={(e) => setData({ ...data, price: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="docs_correct" className="block text-sm font-medium leading-6 mb-2">
                                    Vehicle documents are correct
                                </label>
                                <select
                                    name="docs_correct"
                                    id="docs_correct"
                                    value={data.docs_correct}
                                    onChange={(e) => setData({ ...data, docs_correct: e.target.value })}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-2">
                                        Select
                                    </option>
                                    <option value="yes" className="block border pb-2">
                                        Yes
                                    </option>
                                    <option value="no" className="block border pb-2">
                                        No
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="vehicle_type" className="block text-sm font-medium leading-6 mb-2">
                                    Vehicle Type
                                </label>
                                <select
                                    name="vehicle_type"
                                    id="vehicle_type"
                                    required
                                    value={data.vehicle_type}
                                    onChange={(e) => setData({ ...data, vehicle_type: e.target.value })}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-2">
                                        Select
                                    </option>
                                    <option value="used" className="block border pb-2">
                                        Used
                                    </option>
                                    <option value="new" className="block border pb-2">
                                        New
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="seller_type" className="block text-sm font-medium leading-6 mb-2">
                                    Seller Type
                                </label>
                                <select
                                    name="seller_type"
                                    id="seller_type"
                                    value={data.seller_type}
                                    required
                                    onChange={(e) => setData({ ...data, seller_type: e.target.value })}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-2">
                                        Select
                                    </option>
                                    <option value="individual" className="block border pb-2">
                                        Individual
                                    </option>
                                    <option value="company" className="block border pb-2">
                                        Company
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="website_url" className="block text-sm font-medium leading-6">
                                    Website URL (if any)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="website_url"
                                        name="website_url"
                                        type="text"
                                        placeholder="optional"
                                        value={data.website_url}
                                        onChange={(e) => setData({ ...data, website_url: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6">
                                    Your Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        defaultValue={user}
                                        readOnly
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium leading-6">
                                    Contact Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        required
                                        value={data.phone}
                                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label className="block">Country</label>
                                <select
                                    name="country"
                                    id="country"
                                    value={country}
                                    onChange={(e) => {
                                        const selectedCountry = e.target.value;
                                        setCountry(selectedCountry);
                                        setData({
                                            ...data,
                                            country: Country.getCountryByCode(selectedCountry).name,
                                            flag: Country.getCountryByCode(selectedCountry).flag,
                                        });
                                    }}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-1">
                                        Choose your country
                                    </option>
                                    {Country &&
                                        Country.getAllCountries().map((item) => (
                                            <option
                                                className="block pb-1"
                                                key={item.isoCode}
                                                value={item.isoCode}
                                                name={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label className="block">Choose your State</label>
                                <select
                                    name="state"
                                    id="state"
                                    value={state}
                                    onChange={(e) => {
                                        const selectedState = e.target.value;
                                        setState(selectedState);
                                        setData({
                                            ...data,
                                            state: State.getStateByCodeAndCountry(selectedState, country).name,
                                            city: "",
                                        });
                                    }}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-1">
                                        Choose your state
                                    </option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item, index) => (
                                            <option
                                                className="block pb-1"
                                                key={item.isoCode}
                                                value={item.isoCode}
                                                name={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label className="block">City</label>
                                <select
                                    name="city"
                                    id="city"
                                    value={city}
                                    onChange={(e) => {
                                        const selectedCity = e.target.value;
                                        setCity(selectedCity);
                                        setData({
                                            ...data,
                                            city: selectedCity,
                                        });
                                    }}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-1">
                                        Choose your city
                                    </option>
                                    {City &&
                                        City.getCitiesOfState(country, state).map((item) => (
                                            <option
                                                className="block pb-1"
                                                key={item.isoCode}
                                                value={item.isoCode}
                                                name={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="street" className="block text-sm font-medium leading-6">
                                    Street Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="street"
                                        name="street"
                                        type="text"
                                        required
                                        value={data.street}
                                        onChange={(e) => setData({ ...data, street: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="postal_code" className="block text-sm font-medium leading-6">
                                    Postal Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="postal_code"
                                        name="postal_code"
                                        type="text"
                                        required
                                        value={data.postal_code}
                                        onChange={(e) => setData({ ...data, postal_code: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium leading-6">
                                Vehicle facilities & details
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="message"
                                    name="message"
                                    type="textarea"
                                    required
                                    value={data.message}
                                    onChange={(e) => setData({ ...data, message: e.target.value })}
                                    className={`${styles.textarea}`}
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className={`${styles.button} mt-6`}>
                                Register
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default VehicleSales;
