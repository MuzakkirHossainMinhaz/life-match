"use client";

import React, { use, useEffect, useState } from "react";
import { styles } from "@/app/styles/styles";
import Link from "next/link";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import { Country, State, City } from "country-state-city";

const initialState = {
    full_name: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    father_name: "",
    mother_name: "",
    father_occupation: "",
    mother_occupation: "",
    brothers: 0,
    sisters: 0,
    education: "",
    marital_status: "",
    occupation: "",
    religion: "",
    height: 0,
    weight: 0,
    photo: "",
    guardian: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    social_media: "", // optional
    country: "",
    flag: "",
    skin_color: "",
    message: "", // optional
};

const Biodata = () => {
    const router = useRouter();
    const [data, setData] = useState(initialState);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
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

    const handleBiodata = async (e) => {
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

        data.date_of_birth = new Date(data.date_of_birth);
        data.brothers = parseInt(data.brothers, 10);
        data.sisters = parseInt(data.sisters, 10);
        data.height = parseInt(data.height, 10);
        data.weight = parseInt(data.weight, 10);
        data.email = user;
        if (data.city === "") {
            data.city = data.state;
        }

        axios
            .post("/api/biodata/register", data)
            .then(() => {
                toast.success("Biodata has been registered! Wait for some time for Admin's approval.");
                setLoading(false);
                router.push("/create", undefined, { shallow: true });
            })
            .catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="container text-gray-800 dark:text-white mx-auto p-5 md:p-10">
            <Link shallow className="flex items-center gap-1" href="/create">
                <IoMdArrowRoundBack /> Back
            </Link>
            <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium lg:font-semibold text-center mt-2">
                    Add Bio Data
                </h2>
            </div>
            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center mt-52 h-screen">
                        {" "}
                        <Loader />{" "}
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleBiodata}>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium leading-6">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        required
                                        value={data.full_name}
                                        onChange={(e) => setData({ ...data, full_name: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium leading-6 mb-2">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    id="gender"
                                    required
                                    value={data.gender}
                                    onChange={(e) => setData({ ...data, gender: e.target.value })}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-2">
                                        Select
                                    </option>
                                    <option value="male" className="block border pb-2">
                                        Male
                                    </option>
                                    <option value="female" className="block border pb-2">
                                        Female
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="date_of_birth" className="block text-sm font-medium leading-6">
                                    Date of Birth
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        type="date"
                                        required
                                        value={data.date_of_birth}
                                        onChange={(e) => setData({ ...data, date_of_birth: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="blood_group" className="block text-sm font-medium leading-6 mb-2">
                                    Blood Group
                                </label>
                                <select
                                    name="blood_group"
                                    id="blood_group"
                                    required
                                    value={data.blood_group}
                                    onChange={(e) => setData({ ...data, blood_group: e.target.value })}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-2">
                                        Select
                                    </option>
                                    <option value="a+" className="block border pb-2">
                                        A+
                                    </option>
                                    <option value="b+" className="block border pb-2">
                                        B+
                                    </option>
                                    <option value="ab+" className="block border pb-2">
                                        AB+
                                    </option>
                                    <option value="o+" className="block border pb-2">
                                        O+
                                    </option>
                                    <option value="a-" className="block border pb-2">
                                        A-
                                    </option>
                                    <option value="b-" className="block border pb-2">
                                        B-
                                    </option>
                                    <option value="ab-" className="block border pb-2">
                                        AB-
                                    </option>
                                    <option value="o-" className="block border pb-2">
                                        O-
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="father_name" className="block text-sm font-medium leading-6">
                                    Father&apos;s Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="father_name"
                                        name="father_name"
                                        type="text"
                                        required
                                        value={data.father_name}
                                        onChange={(e) => setData({ ...data, father_name: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="mother_name" className="block text-sm font-medium leading-6">
                                    Mother&apos;s Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="mother_name"
                                        name="mother_name"
                                        type="text"
                                        required
                                        value={data.mother_name}
                                        onChange={(e) => setData({ ...data, mother_name: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="father_occupation" className="block text-sm font-medium leading-6">
                                    Father&apos;s Occupation
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="father_occupation"
                                        name="father_occupation"
                                        type="text"
                                        required
                                        value={data.father_occupation}
                                        onChange={(e) => setData({ ...data, father_occupation: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="mother_occupation" className="block text-sm font-medium leading-6">
                                    Mother&apos;s Occupation
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="mother_occupation"
                                        name="mother_occupation"
                                        type="text"
                                        required
                                        value={data.mother_occupation}
                                        onChange={(e) => setData({ ...data, mother_occupation: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="brothers" className="block text-sm font-medium leading-6">
                                    How many brothers?
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="brothers"
                                        name="brothers"
                                        type="number"
                                        required
                                        value={data.brothers}
                                        onChange={(e) => setData({ ...data, brothers: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="sisters" className="block text-sm font-medium leading-6">
                                    How many sisters?
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="sisters"
                                        name="sisters"
                                        type="number"
                                        required
                                        value={data.sisters}
                                        onChange={(e) => setData({ ...data, sisters: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="education" className="block text-sm font-medium leading-6">
                                    Educational Qualification
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="education"
                                        name="education"
                                        type="text"
                                        required
                                        value={data.education}
                                        onChange={(e) => setData({ ...data, education: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="marital_status" className="block text-sm font-medium leading-6 mb-2">
                                    Marital Status
                                </label>
                                <select
                                    name="marital_status"
                                    id="marital_status"
                                    value={data.marital_status}
                                    required
                                    onChange={(e) => setData({ ...data, marital_status: e.target.value })}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-2">
                                        Select
                                    </option>
                                    <option value="single" className="block border pb-2">
                                        Single
                                    </option>
                                    <option value="married" className="block border pb-2">
                                        Married
                                    </option>
                                    <option value="divorced" className="block border pb-2">
                                        Divorced
                                    </option>
                                    <option value="separated" className="block border pb-2">
                                        Separated
                                    </option>
                                    <option value="widowed" className="block border pb-2">
                                        Widowed
                                    </option>
                                    <option value="other" className="block border pb-2">
                                        Other
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="skin_color" className="block text-sm font-medium leading-6 mb-2">
                                    Skin Color
                                </label>
                                <select
                                    name="skin_color"
                                    id="skin_color"
                                    value={data.skin_color}
                                    required
                                    onChange={(e) => setData({ ...data, skin_color: e.target.value })}
                                    className={`${styles.select}`}
                                >
                                    <option value="" className="block border pb-2">
                                        Select
                                    </option>
                                    <option value="Very Fair" className="block border pb-2">
                                        Very Fair
                                    </option>
                                    <option value="Fair" className="block border pb-2">
                                        Fair
                                    </option>
                                    <option value="Medium" className="block border pb-2">
                                        Medium
                                    </option>
                                    <option value="Light Brown" className="block border pb-2">
                                        Light Brown
                                    </option>
                                    <option value="Brown" className="block border pb-2">
                                        Brown
                                    </option>
                                    <option value="Black" className="block border pb-2">
                                        Black
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="occupation" className="block text-sm font-medium leading-6">
                                    Occupation
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="occupation"
                                        name="occupation"
                                        type="text"
                                        required
                                        value={data.occupation}
                                        onChange={(e) => setData({ ...data, occupation: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="religion" className="block text-sm font-medium leading-6">
                                    Religion
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="religion"
                                        name="religion"
                                        type="text"
                                        required
                                        value={data.religion}
                                        onChange={(e) => setData({ ...data, religion: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="height" className="block text-sm font-medium leading-6">
                                    Height (cm)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="height"
                                        name="height"
                                        type="number"
                                        required
                                        value={data.height}
                                        onChange={(e) => setData({ ...data, height: e.target.value })}
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium leading-6">
                                    Weight (kg)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        required
                                        value={data.weight}
                                        onChange={(e) => setData({ ...data, weight: e.target.value })}
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
                                <label htmlFor="guardian" className="block text-sm font-medium leading-6">
                                    Guardian
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="guardian"
                                        name="guardian"
                                        type="text"
                                        required
                                        value={data.guardian}
                                        onChange={(e) => setData({ ...data, guardian: e.target.value })}
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
                                Message / Additional Information (if any)
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

export default Biodata;
