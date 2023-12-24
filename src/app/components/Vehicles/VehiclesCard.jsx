import React from "react";
import { styles } from "@/app/styles/styles";

const VehiclesCard = ({ data, setOpen, setData }) => {
    const { _id, vehicle_name, vehicle_model, photo, price, vehicle_type, country, flag } = data;

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
            <div className="mt-4 h-28 text-sm">
                <div className="flex justify-between items-center mb-0.5">
                    {/* <p className="text-base font-semibold">{country}</p> */}
                </div>
                <div className="mb-1.5">
                    <p>Vehicle Name: {vehicle_name}</p>
                    <p>Model: {vehicle_model}</p>
                    <p>Vehicle Condition: {vehicle_type}</p>
                    <p>Price: {price}</p>
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

export default VehiclesCard;
