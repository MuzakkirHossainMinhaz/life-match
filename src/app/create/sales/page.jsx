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
    property_owner: "",
    property_partners: 0,
    property_address: "",
    property_name: "",
    photo: "",
    selling_price: 0,
    property_type: "",
    residential: "",
    social_media: "", //optional
    email: "",
    phone: "",
    name: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    message: "",
    flag: "",
};

const Sales = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState("");

    const [country, setCountry] = useState("");
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

    const handleSales = async (e) => {
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

        data.property_partners = parseInt(data.property_partners, 10);
        data.selling_price = parseFloat(data.selling_price);
        data.email = user;
        if (data.city === "") {
            data.city = data.state;
        }

        axios
            .post("/api/sales/register", data)
            .then(() => {
                router.push("/create", undefined, { shallow: true });
                setLoading(false);
                toast.success("Property has been registered!");
            })
            .catch((error) => toast.error(`Something went wrong!<br/>${error.message}`));
        setLoading(false);
    };

    return (
        <div className="container text-gray-800 dark:text-white mx-auto p-5 md:p-10">
            <Link className="flex items-center gap-1" href="/create">
                <IoMdArrowRoundBack /> Back
            </Link>
            <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium lg:font-semibold text-center mt-2">
                    Add Property Data
                </h2>
            </div>
            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center mt-52 min-h-screen">
                        {" "}
                        <Loader />{" "}
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleSales}>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label htmlFor="property_owner" className="block text-sm font-medium leading-6">
                                    Name of the owner of the property
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="property_owner"
                                        name="property_owner"
                                        type="text"
                                        required
                                        value={data.property_owner}
                                        onChange={(e) => setData({ ...data, property_owner: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="property_partners" className="block text-sm font-medium leading-6">
                                    Number of partners in the property
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="property_partners"
                                        name="property_partners"
                                        type="number"
                                        required
                                        value={data.property_partners}
                                        onChange={(e) => setData({ ...data, property_partners: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="property_address" className="block text-sm font-medium leading-6">
                                    Location of the property
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="property_address"
                                        name="property_address"
                                        type="text"
                                        required
                                        value={data.property_address}
                                        onChange={(e) => setData({ ...data, property_address: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="property_name" className="block text-sm font-medium leading-6">
                                    Name of the property
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="property_name"
                                        name="property_name"
                                        type="text"
                                        required
                                        value={data.property_name}
                                        onChange={(e) => setData({ ...data, property_name: e.target.value })}
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
                                <label htmlFor="selling_price" className="block text-sm font-medium leading-6">
                                    Selling price of the property ($)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="selling_price"
                                        name="selling_price"
                                        type="number"
                                        required
                                        value={data.selling_price}
                                        onChange={(e) => setData({ ...data, selling_price: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="property_type" className="block text-sm font-medium leading-6 mb-2">
                                    Property type
                                </label>
                                <select
                                    name="property_type"
                                    id="property_type"
                                    value={data.property_type}
                                    onChange={(e) => setData({ ...data, property_type: e.target.value })}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-2">
                                        Select
                                    </option>
                                    <option value="residential" className="block border pb-2">
                                        Residential
                                    </option>
                                    <option value="commercial" className="block border pb-2">
                                        Commercial
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="residential" className="block text-sm font-medium leading-6 mb-2">
                                    Residential
                                </label>
                                <select
                                    name="residential"
                                    id="residential"
                                    value={data.residential}
                                    onChange={(e) => setData({ ...data, residential: e.target.value })}
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
                                <label htmlFor="email" className="block text-sm font-medium leading-6">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
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
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6">
                                    Your name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="social_media" className="block text-sm font-medium leading-6">
                                    Social Media Link (any)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="social_media"
                                        name="social_media"
                                        type="text"
                                        placeholder="optional"
                                        value={data.social_media}
                                        onChange={(e) => setData({ ...data, social_media: e.target.value })}
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
                                Property Details (Description)
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

export default Sales;
