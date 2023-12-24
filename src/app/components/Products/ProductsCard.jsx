import React from "react";
import { styles } from "@/app/styles/styles";

const ProductsCard = ({ data, setData, setOpen }) => {
    const {
        _id,
        flag,
        product_name,
        photo,
        products_quantity,
        products_price,
        company_name,
        city,
        state,
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
                    {/* <p className="text-base font-semibold">{country}</p> */}
                </div>
                <div className="flex gap-3 mb-0.5">
                    <p>Address:  City/Town: {city}, State: {state}, Postal Code: {postal_code}</p>
                </div>
                <div className="mb-1.5">
                    <p>Product Name: {product_name}</p>
                    {company_name && <p>Company Name: {company_name}</p>}
                    <div className="flex justify-between">
                        <p>Product Pitch: {products_quantity}</p>
                        <p>Price: {products_price}</p>
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

export default ProductsCard;
