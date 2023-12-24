"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import Loader from "@/app/components/Loader";
import { RxCross1 } from "react-icons/rx";
import ProductsCard from "@/app/components/Products/ProductsCard";
import Slider from "@mui/material/Slider";
import { BiFilter } from "react-icons/bi";
import { Country } from "country-state-city";
import { styles } from "@/app/styles/styles";

function valuetext(value) {
    return `${value}`;
}

const minDistance = 10;

const BusinessProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        product_name: "",
        products_price: "",
        country: "",
        products_quantity: "",
    });
    const [country, setCountry] = useState("");

    const [rangeValue1, setRangeValue1] = React.useState([1000, 50000]);
    const [rangeValue2, setRangeValue2] = React.useState([500, 3500]);

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

    const handleRangeChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setRangeValue2([
                Math.min(newValue[0], rangeValue2[1] - minDistance),
                rangeValue2[1],
            ]);
        } else {
            setRangeValue2([
                rangeValue2[0],
                Math.max(newValue[1], rangeValue2[0] + minDistance),
            ]);
        }
    };

    useEffect(() => {
        axios
            .get("/api/business/getbusiness")
            .then((response) => {
                setProducts(response.data.data);
                setFilteredData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const filteredData = products.filter((item) => {
            return (
                (filterOptions.product_name.toLowerCase() === "" ||
                    item.product_name.toLowerCase() ===
                        filterOptions.product_name.toLowerCase()) &&
                (filterOptions.country.toLowerCase() === "" ||
                    item.country.toLowerCase() ===
                        filterOptions.country.toLowerCase()) &&
                rangeValue1[0] <= item.products_price &&
                item.products_price <= rangeValue1[1] &&
                rangeValue2[0] <= item.products_quantity &&
                item.products_quantity <= rangeValue2[1]
            );
        });

        setFilteredData(filteredData);
    };

    return (
     <div  className=" min-h-screen w-full bg-[url('https://www.womenbuildingaustralia.com.au/sites/default/files/images/Poly_BG_Grad%20%281%29_0_1.png')] bg-no-repeat bg-cover py-1">
           <div className="container mx-auto px-1">
            <Navbar />
            <h2 className="text-2xl text-white font-semibold mt-4 mb-3 text-center">
                All Business Products
            </h2>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52">
                            {" "}
                            <Loader />{" "}
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <div>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 w-full"
                                    >
                                        <div className="flex flex-col gap-1 text-white">
                                            <label>Name:</label>
                                            <input
                                                type="text"
                                                name="product_name"
                                                value={
                                                    filterOptions.product_name
                                                }
                                                onChange={handleChange}
                                                className={`${styles.input}`}
                                            />
                                        </div>
                                        <div className="w-full text-white">
                                            <label className="block mb-1">
                                                Country
                                            </label>
                                            <select
                                                name="country"
                                                id="country"
                                                value={country}
                                                className={`${styles.select}`}
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
                                        <div className="w-full text-white">
                                            <span>Price: </span>
                                            <Slider
                                                className="mt-1.5"
                                                min={1}
                                                max={100000}
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
                                        <div className="w-full text-white">
                                            <span>Quantity: </span>
                                            <Slider
                                                className="mt-1.5"
                                                min={1}
                                                max={5000}
                                                getAriaLabel={() =>
                                                    "Products Quantity"
                                                }
                                                value={rangeValue2}
                                                onChange={handleRangeChange2}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                disableSwap
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex gap-2 items-center"
                                            >
                                                <BiFilter />
                                                Filter
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {filteredData.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                                    {filteredData.map((data, index) => (
                                        <ProductsCard
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
                                        Products Not Match...
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
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Products Name:{" "}
                                        <span className="font-semibold">
                                            {data.product_name}
                                        </span>
                                    </p>
                                    <p>
                                        Number of Products:{" "}
                                        <span className="font-semibold">
                                            {data.products_quantity}
                                        </span>
                                    </p>
                                    <p>
                                        Product Price:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.products_price}
                                        </span>
                                    </p>
                                    {data.company_name && (
                                        <p>
                                            Company Name:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {data.company_name}
                                            </span>
                                        </p>
                                    )}
                                    {data.company_registered_address && (
                                        <p>
                                            Company Registered Address:{" "}
                                            <span className="font-semibold">
                                                {" "}
                                                {
                                                    data.company_registered_address
                                                }
                                            </span>
                                        </p>
                                    )}
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
                                        Sate:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.state}
                                        </span>
                                    </p>
                                    <p>
                                        Country:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.country}
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
                                    {data?.company_website_url && (
                                        <p>
                                            Website URL:{" "}
                                            <a
                                                href={`http://${data?.company_website_url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {data?.company_website_url}
                                            </a>
                                        </p>
                                    )}
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

export default BusinessProducts;
