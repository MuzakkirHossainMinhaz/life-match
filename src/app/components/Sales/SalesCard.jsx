import React from "react";
import { styles } from "@/app/styles/styles";

const SalesCard = ({ data, setOpen, setData }) => {
    const {
        _id,
        flag,
        property_address,
        property_name,
        photo,
        selling_price,
        property_type,
        residential,
        city,
        postal_code,
        country,
    } = data;

    const handleOpen = () => {
        setOpen(true);
        setData(data);
    };

    return (
        <div className="bg-slate-200 dark:bg-slate-100 text-gray-700 p-1 rounded-md w-full flex flex-col justify-between">
            <div className="relative">
                <img src={photo} alt="photo" className="h-40 w-full object-cover rounded-md" />
                <span
                    className="absolute left-1 top-1 bg-gray-700 rounded w-9 text-white text-center p-1"
                    role="img"
                    aria-label={flag}
                >
                    {flag}
                </span>
                <span className="text-sm absolute top-1 right-1 bg-gray-700 text-white text-center p-1">
                    {_id.slice(-7).toUpperCase()}
                </span>
            </div>
            <div className="mt-4 h-36 text-sm">
                <div className="flex justify-between items-center mb-0.5">
                    {/* <p className="text-xl font-semibold">{country}</p> */}
                </div>
                <div className="mb-1 ">
                    <p>Address: Street: {property_address}, City/Town: {city}, Postal Code: {postal_code}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="mb-0.5">
                        <p>Property Name: {property_name}</p>
                        <p>Property Type: {property_type}</p>
                    </div>
                    <div>
                        <p>Residential: {residential}</p>
                        <p>Selling Price: {selling_price} $</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <p onClick={handleOpen} className={`${styles.button}`}>
                    See Details
                </p>
            </div>
        </div>
    );
};

export default SalesCard;
