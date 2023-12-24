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
    area: "",
    land_type: "",
    advance_pay: 0,
    monthly_rent: 0,
    room: 0,
    bathroom: 0,
    kitchen: 0,
    balcony: 0,
    photo: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    house_name: "",
    country: "",
    flag: "",
    message: "", // optional
};

const Rent = () => {
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

    const handleRent = async (e) => {
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

        data.email = user;
        if (data.city === "") {
            data.city = data.state;
        }

        axios
            .post("/api/rent/register", data)
            .then(() => {
                router.push("/create", undefined, { shallow: true });
                setLoading(false);
                toast.success("Rent data has been registered!");
            })
            .catch(() => {
                toast.error("Something went wrong!");
                setLoading(false);
            });
    };

    return (
        <div className="container text-gray-800 dark:text-white mx-auto p-5 md:p-10">
            <Link className="flex items-center gap-1" href="/create">
                <IoMdArrowRoundBack /> Back
            </Link>
            <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium lg:font-semibold text-center mt-2">
                    Add Post for Rent
                </h2>
            </div>
            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center mt-52 h-screen">
                        {" "}
                        <Loader />{" "}
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleRent}>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label htmlFor="area" className="block text-sm font-medium leading-6">
                                    Total Area (sq. ft.)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="area"
                                        name="area"
                                        type="text"
                                        required
                                        value={data.area}
                                        onChange={(e) => setData({ ...data, area: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="house_name" className="block text-sm font-medium leading-6">
                                    House Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="house_name"
                                        name="house_name"
                                        type="text"
                                        required
                                        value={data.house_name}
                                        onChange={(e) => setData({ ...data, house_name: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="land_type" className="block text-sm font-medium leading-6">
                                    Land Type
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="land_type"
                                        name="land_type"
                                        type="text"
                                        required
                                        value={data.land_type}
                                        onChange={(e) => setData({ ...data, land_type: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="advance_pay" className="block text-sm font-medium leading-6">
                                    Advance Pay ($)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="advance_pay"
                                        name="advance_pay"
                                        type="number"
                                        required
                                        value={data.advance_pay}
                                        onChange={(e) => setData({ ...data, advance_pay: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="monthly_rent" className="block text-sm font-medium leading-6">
                                    Monthly Rent ($)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="monthly_rent"
                                        name="monthly_rent"
                                        type="number"
                                        required
                                        value={data.monthly_rent}
                                        onChange={(e) => setData({ ...data, monthly_rent: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="room" className="block text-sm font-medium leading-6">
                                    How many rooms?
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="room"
                                        name="room"
                                        type="number"
                                        required
                                        value={data.room}
                                        onChange={(e) => setData({ ...data, room: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="bathroom" className="block text-sm font-medium leading-6">
                                    How many bathrooms?
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="bathroom"
                                        name="bathroom"
                                        type="number"
                                        required
                                        value={data.bathroom}
                                        onChange={(e) => setData({ ...data, bathroom: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="kitchen" className="block text-sm font-medium leading-6">
                                    How many kitchens?
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="kitchen"
                                        name="kitchen"
                                        type="number"
                                        required
                                        value={data.kitchen}
                                        onChange={(e) => setData({ ...data, kitchen: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="balcony" className="block text-sm font-medium leading-6">
                                    How many balconys?
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="balcony"
                                        name="balcony"
                                        type="number"
                                        required
                                        value={data.balcony}
                                        onChange={(e) => setData({ ...data, balcony: e.target.value })}
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
                                Additional Information (if any)
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="message"
                                    name="message"
                                    type="textarea"
                                    placeholder="optional"
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

export default Rent;
