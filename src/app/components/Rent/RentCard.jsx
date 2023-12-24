import React from "react";
import { styles } from "@/app/styles/styles";

const RentCard = ({ data, setOpen, setData }) => {
    const {
        _id,
        photo,
        country,
        street,
        city,
        state,
        flag,
        postal_code,
        area,
        land_type,
        advance_pay,
        monthly_rent,
        room,
        bathroom,
        kitchen,
        balcony,
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
            <div className="mt-2 h-40 text-sm">
                <div className="flex justify-between items-center mb-0.5">
                    {/* <p className="text-base font-semibold">{country}</p> */}
                </div>
                <div className=" mb-1">
                    <p>Address: Street: {street}, City/Town: {city}, Postal Code: {postal_code}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="mb-0.5">
                        <p>Total Area: {area} sq. ft.</p>
                        <p>Land Type: {land_type}</p>
                        <p>Advance Pay: {advance_pay}</p>
                        <p>Monthly Rent: {monthly_rent}</p>
                    </div>
                    <div>
                        <p>Room: {room}</p>
                        <p>Bathroom: {bathroom}</p>
                        <p>Kitchen: {kitchen}</p>
                        <p>Balcony: {balcony}</p>
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

export default RentCard;
