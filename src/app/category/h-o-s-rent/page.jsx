"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import Loader from "@/app/components/Loader";
import RentCard from "@/app/components/Rent/RentCard";
import { RxCross1 } from "react-icons/rx";
import { BiFilter } from "react-icons/bi";
import Slider from "@mui/material/Slider";
import { styles } from "@/app/styles/styles";
import { Country, State, City } from "country-state-city";

function valuetext(value) {
    return `${value}`;
}

const minDistance = 10;

const RentInformation = () => {
    const [rent, setRent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        land_type: "",
        country: "",
        city: "",
        state: "",
    });
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [rangeValue1, setRangeValue1] = React.useState([1000, 3000]);

    const handleRangeChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setRangeValue1([
                Math.min(newValue[0], rangeValue1[1] - minDistance),
                rangeValue1[1],
            ]);
        } else {
            setRangeValue1([
                rangeValue1[0],
                Math.max(newValue[1], rangeValue1[0] + minDistance),
            ]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };

    useEffect(() => {
        axios
            .get("/api/rent/getrent")
            .then((response) => {
                setRent(response.data.data);
                setFilteredData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching rent:", error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const filteredData = rent.filter((item) => {
            return (
                (filterOptions.land_type.toLowerCase() === "" ||
                    item.land_type.toLowerCase() ===
                        filterOptions.land_type.toLowerCase()) &&
                (filterOptions.country.toLowerCase() === "" ||
                    item.country.toLowerCase() ===
                        filterOptions.country.toLowerCase()) &&
                (filterOptions.city.toLowerCase() === "" ||
                    item.city.toLowerCase() ===
                        filterOptions.city.toLowerCase()) &&
                (filterOptions.state.toLowerCase() === "" ||
                    item.state.toLowerCase() ===
                        filterOptions.state.toLowerCase()) &&
                rangeValue1[0] <= item.monthly_rent &&
                item.monthly_rent <= rangeValue1[1]
            );
        });

        setFilteredData(filteredData);
        handleModal();
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
     <div className=" min-h-screen w-full bg-[url('https://www.womenbuildingaustralia.com.au/sites/default/files/images/Poly_BG_Grad%20%281%29_0_1.png')] bg-no-repeat bg-cover py-1">
           <div className="container mx-auto px-1">
            <Navbar />
            <h2 className="text-2xl text-white font-semibold mt-4 mb-3 text-center">
                All House Info for Rent
            </h2>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52 h-screen">
                            <Loader />
                        </div>
                    ) : (
                        <div className="text-gray-800 flex flex-col sm:flex-row gap-2">
                            <div className="sm:hidden">
                                <div>
                                    <button
                                        onClick={handleModal}
                                        className="px-4 py-2 mb-2 flex gap-2 items-center bg-blue-700 text-white rounded"
                                    >
                                        <BiFilter /> Filter
                                    </button>
                                </div>

                                {isOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h2 className="text-xl font-semibold mb-4">
                                                Filter Items
                                            </h2>
                                            <form
                                                onSubmit={handleSubmit}
                                                className="space-y-2"
                                            >
                                                <div className="flex gap-2">
                                                    <label>Land Type:</label>
                                                    <input
                                                        type="text"
                                                        name="land_type"
                                                        value={
                                                            filterOptions.land_type
                                                        }
                                                        onChange={handleChange}
                                                        className="border px-2 py-1 border-solid border-blue-500 rounded"
                                                    />
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
                                                                e.target.value;
                                                            setState(
                                                                selectedState,
                                                            );
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
                                                                e.target.value;
                                                            setCity(
                                                                selectedCity,
                                                            );
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
                                                                    name={
                                                                        item.name
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className="w-full">
                                                    <span>
                                                        Monthly Rent: ($){" "}
                                                    </span>
                                                    <Slider
                                                        min={0}
                                                        max={8000}
                                                        getAriaLabel={() =>
                                                            "Products Price"
                                                        }
                                                        value={rangeValue1}
                                                        onChange={
                                                            handleRangeChange1
                                                        }
                                                        valueLabelDisplay="auto"
                                                        getAriaValueText={
                                                            valuetext
                                                        }
                                                        disableSwap
                                                    />
                                                </div>
                                                <div className="flex flex-row gap-2 w-full">
                                                    <button
                                                        type="submit"
                                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
                                                    >
                                                        Filter Data
                                                    </button>
                                                    <button
                                                        onClick={handleModal}
                                                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg w-full"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="hidden sm:block max-w-sm">
                                <div className="bg-white p-3 rounded-lg shadow-lg w-full">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Filter Items
                                    </h2>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-2"
                                    >
                                        <div className="flex justify-between items-center gap-2">
                                            <label className="w-fit">Land Type:</label>
                                            <input
                                                type="text"
                                                name="land_type"
                                                value={filterOptions.land_type}
                                                onChange={handleChange}
                                                className="border px-2 py-1 border-solid border-blue-500 rounded w-44"
                                            />
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
                                                    setCountry(selectedCountry);
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
                                                                name={item.name}
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
                                                            key={item.isoCode}
                                                            value={item.isoCode}
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
                                            <span>Monthly Rent: ($) </span>
                                            <Slider
                                                min={0}
                                                max={8000}
                                                getAriaLabel={() =>
                                                    "Products Price"
                                                }
                                                value={rangeValue1}
                                                onChange={handleRangeChange1}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                disableSwap
                                            />
                                        </div>
                                        <div className="flex flex-row gap-2 w-full">
                                        <button
                                                type="submit"
                                                className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-lg flex gap-2 items-center justify-center"
                                            >
                                                <BiFilter />
                                                Filter
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {filteredData.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                    {filteredData.map((data, index) => (
                                        <RentCard
                                            key={index}
                                            data={data}
                                            setOpen={setOpen}
                                            setData={setData}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center w-full">
                                    <p className="text-gray-500 mt-40">
                                        Not Found...
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {open && (
                <div className="bg-slate-800 text-gray-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-2 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] max-h-[540px] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Area:{" "}
                                        <span className="font-semibold">
                                            {data.area}
                                        </span>
                                    </p>
                                    <p>
                                        Land Type:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.land_type}
                                        </span>
                                    </p>
                                    <p>
                                        Advance Pay:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.advance_pay}
                                        </span>
                                    </p>
                                    <p>
                                        Monthly Rent:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.monthly_rent}
                                        </span>
                                    </p>
                                    <p>
                                        Number of Rooms:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.room}
                                        </span>
                                    </p>
                                    <p>
                                        Number of Bathrooms:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.bathroom}
                                        </span>
                                    </p>
                                    <p>
                                        Number of Kitchen:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.kitchen}
                                        </span>
                                    </p>
                                    <p>
                                        Number of Balcony:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.balcony}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">
                                            Address:
                                        </span>
                                    </p>
                                    <p>
                                        Street:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.street}
                                        </span>
                                    </p>
                                    <p>
                                        City/Town:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.city}
                                        </span>
                                    </p>
                                    <p>
                                        State:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.state}
                                        </span>
                                    </p>
                                    <p>
                                        Postal Code:{" "}
                                        <span className="font-semibold">
                                            {" "}
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
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">
                                    Contact Information:
                                </p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                </div>
                            </div>
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

export default RentInformation;
