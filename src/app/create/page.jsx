import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React from "react";
import { BsPersonFillAdd, BsFillHouseAddFill } from "react-icons/bs";
import { BiSolidCartAdd, BiSolidAddToQueue } from "react-icons/bi";
import { SiAddthis } from "react-icons/si";

const Create = () => {
    return (
        <div className="container mx-auto">
            <Navbar />

            <div className="bg-slate-100 p-4 rounded-md w-full h-[calc(100vh-80px)] md:h-[calc(100vh-112px)] lg:h-[calc(100vh-98px)] flex flex-col gap-5 items-center justify-start overflow-y-scroll">
                <Link
                    href="/create/biodata"
                    className="flex flex-col items-center p-8 bg-slate-200 hover:bg-blue-200 hover:text-blue-900 rounded-md w-80 gap-4 text-gray-700"
                >
                    <BsPersonFillAdd size={30} />
                    <span className="text-lg text-center">Add Biodata for Marriage S.D</span>
                </Link>
                <div className="flex flex-col lg:flex-row gap-5">
                    <Link
                        href="/create/rent"
                        className="flex flex-col items-center p-8 bg-slate-200 hover:bg-blue-200 hover:text-blue-900 rounded-md w-80 gap-4 text-gray-700"
                    >
                        <BsFillHouseAddFill size={30} />
                        <span className="text-lg text-center">Add Post for H.O.S Rent</span>
                    </Link>
                    <Link
                        href="/create/sales"
                        className="flex flex-col items-center p-8 bg-slate-200 hover:bg-blue-200 hover:text-blue-900 rounded-md w-80 gap-4 text-gray-700"
                    >
                        <BiSolidCartAdd size={30} />
                        <span className="text-lg text-center">Add Post for L.B.O Sale</span>
                    </Link>
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                    <Link
                        href="/create/vehicle_sales"
                        className="flex flex-col items-center p-8 bg-slate-200 hover:bg-blue-200 hover:text-blue-900 rounded-md w-80 gap-4 text-gray-700"
                    >
                        <SiAddthis size={30} />
                        <span className="text-lg text-center">Add Vehicle for Sales</span>
                    </Link>
                    <Link
                        href="/create/products"
                        className="flex flex-col items-center p-8 bg-slate-200 hover:bg-blue-200 hover:text-blue-900 rounded-md w-80 gap-4 text-gray-700"
                    >
                        <BiSolidAddToQueue size={30} />
                        <span className="text-lg text-center">Add Post for Business Product</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Create;
