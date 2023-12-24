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
    photo: "",
    products_quantity: 0,
    products_price: 0,
    social_media: "",
    company_name: "",
    company_registered_address: "",
    company_website_url: "",
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    flag: "",
    message: "",
    product_name: "",
};

const Products = () => {
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

    const handleProducts = async (e) => {
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
            .post("/api/business/register", data)
            .then(() => {
                router.push("/create", undefined, { shallow: true });
                setLoading(false);
                toast.success("Product has been registered!");
            })
            .catch(() => toast.error("Something went wrong!"));
    };

    return (
        <div className="container text-gray-800 dark:text-white mx-auto p-5 md:p-10">
            <Link className="flex items-center gap-1" href="/create">
                <IoMdArrowRoundBack /> Back
            </Link>
            <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium lg:font-semibold text-center mt-2">
                    Add Product Details
                </h2>
            </div>
            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center mt-52 min-h-screen">
                        {" "}
                        <Loader />{" "}
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleProducts}>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label htmlFor="photo" className="block text-sm font-medium leading-6">
                                    Product Photo
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
                                <label htmlFor="products_quantity" className="block text-sm font-medium leading-6">
                                    Name of the product
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="product_name"
                                        name="product_name"
                                        type="text"
                                        required
                                        value={data.product_name}
                                        onChange={(e) => setData({ ...data, product_name: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="products_quantity" className="block text-sm font-medium leading-6">
                                    Number of Products
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="products_quantity"
                                        name="products_quantity"
                                        type="number"
                                        required
                                        value={data.products_quantity}
                                        onChange={(e) => setData({ ...data, products_quantity: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="products_price" className="block text-sm font-medium leading-6">
                                    Products Price ($)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="products_price"
                                        name="products_price"
                                        type="number"
                                        required
                                        value={data.products_price}
                                        onChange={(e) => setData({ ...data, products_price: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="social_media" className="block text-sm font-medium leading-6">
                                    Social Media Links (if any)
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
                            <div>
                                <label htmlFor="company_name" className="block text-sm font-medium leading-6">
                                    Company Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="company_name"
                                        name="company_name"
                                        type="text"
                                        placeholder="optional"
                                        value={data.company_name}
                                        onChange={(e) => setData({ ...data, company_name: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="company_registered_address"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Company Registered Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="company_registered_address"
                                        name="company_registered_address"
                                        type="text"
                                        placeholder="optional"
                                        value={data.company_registered_address}
                                        onChange={(e) =>
                                            setData({ ...data, company_registered_address: e.target.value })
                                        }
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="company_website_url" className="block text-sm font-medium leading-6">
                                    Company Website URL (if any)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="company_website_url"
                                        name="company_website_url"
                                        type="text"
                                        placeholder="optional"
                                        value={data.company_website_url}
                                        onChange={(e) => setData({ ...data, company_website_url: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6">
                                    Your Name
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
                                Description of the Products
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

export default Products;
