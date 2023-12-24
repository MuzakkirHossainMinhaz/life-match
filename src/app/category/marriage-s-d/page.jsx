"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import Loader from "@/app/components/Loader";
import BioCard from "@/app/components/Biodata/BioCard";
import { RxCross1 } from "react-icons/rx";
import { styles } from "@/app/styles/styles";
import { Country, State, City } from "country-state-city";
import { BiFilter } from "react-icons/bi";

const MarriageBiodata = () => {
    const [biodata, setBiodata] = useState([]);
    const [request, setRequest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [user, setUser] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        gender: "",
        marital_status: "",
        occupation: "",
        education: "",
        religion: "",
        country: "",
        state: "",
        city: "",
        height: 0,
        weight: 0,
        skin_color: "",
    });

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        axios
            .get("/api/biodata/getbiodata")
            .then((response) => {
                setBiodata(response.data.data);
                setFilteredData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching biodata:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/request/getRequest")
            .then((response) => {
                setRequest(response.data.data);

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching biodata:", error);
                setLoading(false);
            });
    }, []);

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data.email);
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const result = [];
    const senderBio = biodata.map((data) => {
        if (data.email === user && data.isApproved) {
            const temp = data._id.slice(-7);
            result.push(temp);
        }
    });

    const handleContactInfo = (id) => {
        const data = {
            reciever: biodata.find((data) => data._id === id).email,
            sender: user,
            for_bio: id.slice(-7),
            sender_bio: result,
        };

        axios
            .post("/api/request/register", data)
            .then(() => {
                toast.success("Sent request succesfully!");
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform filtering based on selected options
        const filteredData = biodata.filter((item) => {
            return (
                (filterOptions.gender.toLowerCase() === "" ||
                    item.gender.toLowerCase() ===
                    filterOptions.gender.toLowerCase()) &&
                (filterOptions.education.toLowerCase() === "" ||
                    item.education.toLowerCase() ===
                    filterOptions.education.toLowerCase()) &&
                (filterOptions.marital_status.toLowerCase() === "" ||
                    item.marital_status.toLowerCase() ===
                    filterOptions.marital_status.toLowerCase()) &&
                (filterOptions.religion.toLowerCase() === "" ||
                    item.religion.toLowerCase() ===
                    filterOptions.religion.toLowerCase()) &&
                (filterOptions.occupation.toLowerCase() === "" ||
                    item.occupation.toLowerCase() ===
                    filterOptions.occupation.toLowerCase()) &&
                (filterOptions.country.toLowerCase() === "" ||
                    item.country.toLowerCase() ===
                    filterOptions.country.toLowerCase()) &&
                (filterOptions.state.toLowerCase() === "" ||
                    item.state.toLowerCase() ===
                    filterOptions.state.toLowerCase()) &&
                (filterOptions.city.toLowerCase() === "" ||
                    item.city.toLowerCase() ===
                    filterOptions.city.toLowerCase()) &&
                (filterOptions.skin_color.toLowerCase() === "" ||
                    item.skin_color.toLowerCase() ===
                    filterOptions.skin_color.toLowerCase())
            );
        });

        setFilteredData(filteredData);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <div className=" min-h-screen w-full bg-[url('https://www.womenbuildingaustralia.com.au/sites/default/files/images/Poly_BG_Grad%20%281%29_0_1.png')] bg-no-repeat bg-cover py-1">
            <div className="container mx-auto px-1">
                <Navbar />
                <h2 className="text-2xl font-semibold mt-4 mb-3 text-center text-white">
                    All Biodata for Marriage
                </h2>
                {!open && (
                    <>
                        {loading ? (
                            <div className="flex justify-center mt-52 h-screen">
                                {" "}
                                <Loader />{" "}
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-3 items-start">
                                <div className="sm:hidden text-gray-800">
                                    <button
                                        onClick={openModal}
                                        className="px-4 py-2 flex gap-2 items-center bg-blue-700 text-white rounded"
                                    >
                                        <BiFilter /> Filter
                                    </button>

                                    {isOpen && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                                <h2 className="text-xl font-semibold mb-4">
                                                    Filter Items
                                                </h2>

                                                <div>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="flex justify-between ">
                                                            <label>Gender:</label>

                                                            <select
                                                                name="gender"
                                                                value={
                                                                    filterOptions.gender
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="border px-4 border-solid border-blue-500 rounded w-52"
                                                            >
                                                                <option value="">
                                                                    All
                                                                </option>
                                                                <option value="Male">
                                                                    Male
                                                                </option>
                                                                <option value="Female">
                                                                    Female
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="flex justify-between my-5">
                                                            <label>
                                                                Education:
                                                            </label>
                                                            <select
                                                                name="education"
                                                                value={
                                                                    filterOptions.education
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="border px-4 border-solid border-blue-500 rounded w-52"
                                                            >
                                                                <option value="">
                                                                    All
                                                                </option>
                                                                <option value="ssc">
                                                                    ssc
                                                                </option>
                                                                <option value="hsc">
                                                                    hsc
                                                                </option>
                                                                <option value="hons">
                                                                    hons
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="flex justify-between ">
                                                            <label>
                                                                Marital Status:
                                                            </label>
                                                            <select
                                                                name="marital_status"
                                                                value={
                                                                    filterOptions.marital_status
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="border px-4 border-solid border-blue-500 rounded w-52"
                                                            >
                                                                <option value="">
                                                                    All
                                                                </option>
                                                                <option value="Single">
                                                                    Single
                                                                </option>
                                                                <option value="Married">
                                                                    Married
                                                                </option>
                                                                <option value="Divorced">
                                                                    Divorced
                                                                </option>
                                                                <option value="Widowed">
                                                                    Widowed
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <label>Religion:</label>
                                                            <select
                                                                name="religion"
                                                                value={
                                                                    filterOptions.religion
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="border px-4 border-solid border-blue-500 rounded w-52"
                                                            >
                                                                <option value="">
                                                                    All
                                                                </option>
                                                                <option value="Islam">
                                                                    Islam
                                                                </option>
                                                                <option value="Hindu">
                                                                    Hindu
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <label>
                                                                Occupation:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="occupation"
                                                                value={
                                                                    filterOptions.occupation
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="border px-4 border-solid border-blue-500 rounded w-52"
                                                            />
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <label>
                                                                Skin Color:
                                                            </label>
                                                            <select
                                                                name="skin_color"
                                                                value={
                                                                    filterOptions.skin_color
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="border px-4 border-solid border-blue-500 rounded w-52"
                                                            >
                                                                <option value="">
                                                                    All
                                                                </option>
                                                                <option value="Very Fair">
                                                                    Very Fair
                                                                </option>
                                                                <option value="Fair">
                                                                    Fair
                                                                </option>
                                                                <option value="Medium">
                                                                    Medium
                                                                </option>
                                                                <option value="Light Brown">
                                                                    Light Brown
                                                                </option>
                                                                <option value="Brown">
                                                                    Brown
                                                                </option>
                                                                <option value="Black">
                                                                    Black
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="w-full mt-5">
                                                            <label className="block">
                                                                Country
                                                            </label>
                                                            <select
                                                                name="country"
                                                                id="country"
                                                                value={country}
                                                                onChange={(e) => {
                                                                    const selectedCountry =
                                                                        e.target
                                                                            .value;
                                                                    setCountry(
                                                                        selectedCountry,
                                                                    );
                                                                    setFilterOptions(
                                                                        {
                                                                            ...filterOptions,
                                                                            country:
                                                                                Country.getCountryByCode(
                                                                                    selectedCountry,
                                                                                )
                                                                                    .name,
                                                                        },
                                                                    );
                                                                }}
                                                                className={`${styles.select}`}
                                                            >
                                                                <option
                                                                    value=""
                                                                    className="block border pb-1"
                                                                >
                                                                    Choose your
                                                                    country
                                                                </option>
                                                                {Country &&
                                                                    Country.getAllCountries().map(
                                                                        (item) => (
                                                                            <option
                                                                                className="block pb-1"
                                                                                key={
                                                                                    item.isoCode
                                                                                }
                                                                                value={
                                                                                    item.isoCode
                                                                                }
                                                                                name={
                                                                                    item.name
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </option>
                                                                        ),
                                                                    )}
                                                            </select>
                                                        </div>
                                                        <div className="w-full mt-5">
                                                            <label className="block">
                                                                Choose your State
                                                            </label>
                                                            <select
                                                                name="state"
                                                                id="state"
                                                                value={state}
                                                                onChange={(e) => {
                                                                    const selectedState =
                                                                        e.target
                                                                            .value;
                                                                    setState(
                                                                        selectedState,
                                                                    );
                                                                    setFilterOptions(
                                                                        {
                                                                            ...filterOptions,
                                                                            state: State.getStateByCodeAndCountry(
                                                                                selectedState,
                                                                                country,
                                                                            ).name,
                                                                            city: "",
                                                                        },
                                                                    );
                                                                }}
                                                                className={`${styles.select}`}
                                                            >
                                                                <option
                                                                    value=""
                                                                    className="block border pb-1"
                                                                >
                                                                    Choose your
                                                                    state
                                                                </option>
                                                                {State &&
                                                                    State.getStatesOfCountry(
                                                                        country,
                                                                    ).map(
                                                                        (
                                                                            item,
                                                                            index,
                                                                        ) => (
                                                                            <option
                                                                                className="block pb-1"
                                                                                key={
                                                                                    item.isoCode
                                                                                }
                                                                                value={
                                                                                    item.isoCode
                                                                                }
                                                                                name={
                                                                                    item.name
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </option>
                                                                        ),
                                                                    )}
                                                            </select>
                                                        </div>
                                                        <div className="w-full mt-5">
                                                            <label className="block">
                                                                City
                                                            </label>
                                                            <select
                                                                name="city"
                                                                id="city"
                                                                value={city}
                                                                onChange={(e) => {
                                                                    const selectedCity =
                                                                        e.target
                                                                            .value;
                                                                    setCity(
                                                                        selectedCity,
                                                                    );
                                                                    setFilterOptions(
                                                                        {
                                                                            ...filterOptions,
                                                                            city: selectedCity,
                                                                        },
                                                                    );
                                                                }}
                                                                className={`${styles.select}`}
                                                            >
                                                                <option
                                                                    value=""
                                                                    className="block border pb-1"
                                                                >
                                                                    Choose your city
                                                                </option>
                                                                {City &&
                                                                    City.getCitiesOfState(
                                                                        country,
                                                                        state,
                                                                    ).map(
                                                                        (item) => (
                                                                            <option
                                                                                className="block pb-1"
                                                                                key={
                                                                                    item.isoCode
                                                                                }
                                                                                value={
                                                                                    item.isoCode
                                                                                }
                                                                                name={
                                                                                    item.name
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </option>
                                                                        ),
                                                                    )}
                                                            </select>
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <label>Height:</label>
                                                            <input
                                                                type="range"
                                                                name="height"
                                                                value={
                                                                    filterOptions.height
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="border px-4 border-solid border-blue-500 rounded w-52"
                                                            />
                                                        </div>
                                                        
                                                        <div className="flex justify-between mt-5">
                                                            <label>Weight:</label>
                                                            <input
                                                                type="range"
                                                                name="weight"
                                                                value={
                                                                    filterOptions.weight
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="border px-4 border-solid border-blue-500 rounded w-52"
                                                            />
                                                        </div>
                                                        <div className="flex flex-row gap-3">
                                                            <div>
                                                                <button
                                                                    type="submit"
                                                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                                                >
                                                                    Filter Data
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    onClick={
                                                                        closeModal
                                                                    }
                                                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="hidden sm:block text-gray-800 max-w-sm">
                                    <div className="bg-white p-3 rounded-lg shadow-lg">
                                        <h2 className="text-xl font-semibold mb-4">
                                            Filter Items
                                        </h2>

                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="flex justify-between ">
                                                    <label>Gender:</label>

                                                    <select
                                                        name="gender"
                                                        value={filterOptions.gender}
                                                        onChange={handleChange}
                                                        className="border px-4 border-solid border-blue-500 rounded w-40"
                                                    >
                                                        <option value="">
                                                            All
                                                        </option>
                                                        <option value="Male">
                                                            Male
                                                        </option>
                                                        <option value="Female">
                                                            Female
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="flex justify-between my-5">
                                                    <label>Education:</label>
                                                    <select
                                                        name="education"
                                                        value={
                                                            filterOptions.education
                                                        }
                                                        onChange={handleChange}
                                                        className="border px-4 border-solid border-blue-500 rounded w-40"
                                                    >
                                                        <option value="">
                                                            All
                                                        </option>
                                                        <option value="ssc">
                                                            SSC
                                                        </option>
                                                        <option value="hsc">
                                                            HSC
                                                        </option>
                                                        <option value="hons">
                                                            BSc.
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="flex justify-between ">
                                                    <label>Marital Status:</label>
                                                    <select
                                                        name="marital_status"
                                                        value={
                                                            filterOptions.marital_status
                                                        }
                                                        onChange={handleChange}
                                                        className="border px-4 border-solid border-blue-500 rounded w-40"
                                                    >
                                                        <option value="">
                                                            All
                                                        </option>
                                                        <option value="Single">
                                                            Single
                                                        </option>
                                                        <option value="Married">
                                                            Married
                                                        </option>
                                                        <option value="Divorced">
                                                            Divorced
                                                        </option>
                                                        <option value="Widowed">
                                                            Widowed
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="flex justify-between mt-5">
                                                    <label>Religion:</label>
                                                    <select
                                                        name="religion"
                                                        value={
                                                            filterOptions.religion
                                                        }
                                                        onChange={handleChange}
                                                        className="border px-4 border-solid border-blue-500 rounded w-40"
                                                    >
                                                        <option value="">
                                                            All
                                                        </option>
                                                        <option value="islam">
                                                            Islam
                                                        </option>
                                                        <option value="christian">
                                                            Christian
                                                        </option>
                                                        <option value="buddhist">
                                                            Buddhist
                                                        </option>
                                                        <option value="hindu">
                                                            Hindu
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="flex justify-between mt-5">
                                                    <label>Occupation:</label>
                                                    <input
                                                        type="text"
                                                        name="occupation"
                                                        value={
                                                            filterOptions.occupation
                                                        }
                                                        onChange={handleChange}
                                                        className="border px-4 border-solid border-blue-500 rounded w-40"
                                                    />
                                                </div>
                                                <div className="flex justify-between mt-5">
                                                    <label>Skin Color:</label>
                                                    <select
                                                        name="skin_color"
                                                        value={
                                                            filterOptions.skin_color
                                                        }
                                                        onChange={handleChange}
                                                        className="border px-4 border-solid border-blue-500 rounded w-40"
                                                    >
                                                        <option value="">
                                                            All
                                                        </option>
                                                        <option value="Very Fair">
                                                            Very Fair
                                                        </option>
                                                        <option value="Fair">
                                                            Fair
                                                        </option>
                                                        <option value="Medium">
                                                            Medium
                                                        </option>
                                                        <option value="Light Brown">
                                                            Light Brown
                                                        </option>
                                                        <option value="Brown">
                                                            Brown
                                                        </option>
                                                        <option value="Black">
                                                            Black
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="w-full mt-5">
                                                    <label className="block">
                                                        Country
                                                    </label>
                                                    <select
                                                        name="country"
                                                        id="country"
                                                        value={country}
                                                        onChange={(e) => {
                                                            const selectedCountry =
                                                                e.target.value;
                                                            setCountry(
                                                                selectedCountry,
                                                            );
                                                            setFilterOptions({
                                                                ...filterOptions,
                                                                country:
                                                                    Country.getCountryByCode(
                                                                        selectedCountry,
                                                                    ).name,
                                                            });
                                                        }}
                                                        className={`${styles.select}`}
                                                    >
                                                        <option
                                                            value=""
                                                            className="block border pb-1"
                                                        >
                                                            Choose your country
                                                        </option>
                                                        {Country &&
                                                            Country.getAllCountries().map(
                                                                (item) => (
                                                                    <option
                                                                        className="block pb-1"
                                                                        key={
                                                                            item.isoCode
                                                                        }
                                                                        value={
                                                                            item.isoCode
                                                                        }
                                                                        name={
                                                                            item.name
                                                                        }
                                                                    >
                                                                        {item.name}
                                                                    </option>
                                                                ),
                                                            )}
                                                    </select>
                                                </div>
                                                <div className="w-full mt-5">
                                                    <label className="block">
                                                        State
                                                    </label>
                                                    <select
                                                        name="state"
                                                        id="state"
                                                        value={state}
                                                        onChange={(e) => {
                                                            const selectedState =
                                                                e.target.value;
                                                            setState(selectedState);
                                                            setFilterOptions({
                                                                ...filterOptions,
                                                                state: State.getStateByCodeAndCountry(
                                                                    selectedState,
                                                                    country,
                                                                ).name,
                                                                city: "",
                                                            });
                                                        }}
                                                        className={`${styles.select}`}
                                                    >
                                                        <option
                                                            value=""
                                                            className="block border pb-1"
                                                        >
                                                            Choose your state
                                                        </option>
                                                        {State &&
                                                            State.getStatesOfCountry(
                                                                country,
                                                            ).map((item, index) => (
                                                                <option
                                                                    className="block pb-1"
                                                                    key={
                                                                        item.isoCode
                                                                    }
                                                                    value={
                                                                        item.isoCode
                                                                    }
                                                                    name={item.name}
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className="w-full mt-5">
                                                    <label className="block">
                                                        City
                                                    </label>
                                                    <select
                                                        name="city"
                                                        id="city"
                                                        value={city}
                                                        onChange={(e) => {
                                                            const selectedCity =
                                                                e.target.value;
                                                            setCity(selectedCity);
                                                            setFilterOptions({
                                                                ...filterOptions,
                                                                city: selectedCity,
                                                            });
                                                        }}
                                                        className={`${styles.select}`}
                                                    >
                                                        <option
                                                            value=""
                                                            className="block border pb-1"
                                                        >
                                                            Choose your city
                                                        </option>
                                                        {City &&
                                                            City.getCitiesOfState(
                                                                country,
                                                                state,
                                                            ).map((item) => (
                                                                <option
                                                                    className="block pb-1"
                                                                    key={
                                                                        item.isoCode
                                                                    }
                                                                    value={
                                                                        item.isoCode
                                                                    }
                                                                    name={item.name}
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className="flex justify-between mt-5 gap-4">
                                                    <label>Height:</label>
                                                    <input
                                                        type="range"
                                                        name="height"
                                                        value={filterOptions.height}
                                                        onChange={handleChange}
                                                        className="border px-4 border-solid border-blue-500 rounded w-52"
                                                    />
                                                </div>
                                                <div className="flex justify-between mt-5 gap-4">
                                                    <label>Weight:</label>
                                                    <input
                                                        type="range"
                                                        name="weight"
                                                        value={filterOptions.weight}
                                                        onChange={handleChange}
                                                        className="border px-4 border-solid border-blue-500 rounded w-52"
                                                    />
                                                </div>
                                                <div className="w-full text-center">
                                                    <button
                                                        type="submit"
                                                        className="mt-4 px-4 py-2 !w-full flex items-center gap-2 bg-blue-500 text-white rounded-lg"
                                                    >
                                                        <BiFilter /> Filter
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                                    {filteredData.map((data, index) => (
                                        <BioCard
                                            biodata={filteredData}
                                            key={index}
                                            button={true}
                                            data={data}
                                            setOpen={setOpen}
                                            setData={setData}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {open && (
                    <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll text-gray-800">
                        <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                            <RxCross1
                                onClick={() => setOpen(false)}
                                className="absolute top-2 right-2 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-4 text-lg">
                                <div>
                                    <img
                                        className="w-60 h-60 object-cover rounded-md"
                                        src={data.photo}
                                        alt="photo"
                                    />
                                </div>
                                <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                    <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                        <p>
                                            Full Name:{" "}
                                            <span className="font-semibold">
                                                {data.full_name}
                                            </span>
                                        </p>
                                        <p>
                                            Date of Birth:{" "}
                                            <span className="font-semibold">
                                                {data.date_of_birth.slice(0, 10)}
                                            </span>
                                        </p>
                                        <p>
                                            Blood Group:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.blood_group}
                                            </span>
                                        </p>
                                        <p>
                                            Gender:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.gender}
                                            </span>
                                        </p>
                                        <p>
                                            Marital Status:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.marital_status}
                                            </span>
                                        </p>
                                        <p>
                                            Education:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.education}
                                            </span>
                                        </p>
                                        <p>
                                            Occupation:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.occupation}
                                            </span>
                                        </p>
                                        <div className="flex justify-between">
                                            <p>
                                                Religion:{" "}
                                                <span className="font-semibold">
                                                    {" "}
                                                    {data.religion}
                                                </span>
                                            </p>
                                            <p>
                                                Skin Color:{" "}
                                                <span className="font-semibold capitalize">
                                                    {" "}
                                                    {data.skin_color}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>
                                                Height:{" "}
                                                <span className="font-semibold">
                                                    {" "}
                                                    {data.height} cm
                                                </span>
                                            </p>
                                            <p>
                                                Weight:{" "}
                                                <span className="font-semibold">
                                                    {" "}
                                                    {data.weight} kg
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                        <p>
                                            Father&apos;s Name:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.father_name}
                                            </span>
                                        </p>
                                        <p>
                                            Father&apos;s Occupation:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.father_occupation}
                                            </span>
                                        </p>
                                        <p>
                                            Mother&apos;s Name:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.mother_name}
                                            </span>
                                        </p>
                                        <p>
                                            Mother&apos;s Occupation:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.mother_occupation}
                                            </span>
                                        </p>
                                        <p>
                                            Number of Brothers:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.brothers}
                                            </span>
                                        </p>
                                        <p>
                                            Number of Sisters:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.sisters}
                                            </span>
                                        </p>
                                        <p>
                                            Guardian:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.guardian}
                                            </span>
                                        </p>
                                        <p>
                                            Address:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.street}, {data.city},{" "}
                                                {data.postal_code}
                                            </span>
                                        </p>
                                        <p>
                                            Country:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.state}, {data.country}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                {data.sharedWith.includes(user) && (
                                    <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                        <p className="font-semibold">
                                            Contact Information:
                                        </p>
                                        <div>
                                            <p>Email: {data.email}</p>
                                            <p>Phone: {data.phone}</p>
                                            <p>
                                                Social Links: {data?.social_media}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {!data.sharedWith.includes(user) && (
                                    <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                        <button
                                            onClick={() =>
                                                handleContactInfo(data._id)
                                            }
                                            className={`${styles.button} ${request.find(
                                                (req) =>
                                                    req.for_bio ===
                                                    data._id.slice(-7),
                                            ) &&
                                                "!cursor-not-allowed !bg-gray-500"
                                                }`}
                                        >
                                            Request for Contact Information
                                        </button>
                                    </div>
                                )}

                                <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                    <p className="font-semibold">
                                        Message / Additional Information:
                                    </p>
                                    <p>{data?.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarriageBiodata;
