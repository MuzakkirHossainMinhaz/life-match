"use client";

import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TfiWrite } from "react-icons/tfi";
import { TbListDetails } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GoSignOut } from "react-icons/go";
import axios from "axios";
import { MdCarRental, MdOutlineBusinessCenter, MdPointOfSale } from "react-icons/md";
import { BsCarFrontFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";

const ProfileSideBar = ({ data, select, setSelect }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await axios.get("api/users/logout");
            toast.success("Logout successful");
            router.push("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-white p-4 rounded-md w-full flex flex-col gap-8 h-[calc(100vh-88px)] md:h-[calc(100vh-128px)] lg:h-[calc(100vh-104px)]">
            <div
                onClick={() => setSelect(1)}
                className={`flex gap-2 items-center cursor-pointer ${select === 1 ? "text-blue-700" : "text-gray-700"}`}
            >
                <p>
                    <CgProfile size={23} />
                </p>
                <span className="text-lg hidden md:block font-medium">Profile</span>
            </div>
            <div
                onClick={() => setSelect(20)}
                className={`flex gap-2 items-center cursor-pointer ${select === 20 ? "text-blue-700" : "text-gray-700"}`}
            >
                <p>
                    <BiSolidDashboard size={23} />
                </p>
                <span className="text-lg hidden md:block font-medium">Dashboard</span>
            </div>
            <div
                onClick={() => setSelect(2)}
                className={`flex gap-2 items-center cursor-pointer ${select === 2 ? "text-blue-700" : "text-gray-700"}`}
            >
                <p>
                    <TbListDetails size={23} />
                </p>
                <span className="text-lg hidden md:block font-medium">Bio Data</span>
            </div>
            <div
                onClick={() => setSelect(3)}
                className={`flex gap-2 items-center cursor-pointer ${select === 3 ? "text-blue-700" : "text-gray-700"}`}
            >
                <p>
                    <MdCarRental size={23} />
                </p>
                <span className="text-lg hidden md:block font-medium">Rent</span>
            </div>
            <div
                onClick={() => setSelect(4)}
                className={`flex gap-2 items-center cursor-pointer ${select === 4 ? "text-blue-700" : "text-gray-700"}`}
            >
                <p>
                    <MdPointOfSale size={23} />
                </p>
                <span className="text-lg hidden md:block font-medium">Sales</span>
            </div>
            <div
                onClick={() => setSelect(5)}
                className={`flex gap-2 items-center cursor-pointer ${select === 5 ? "text-blue-700" : "text-gray-700"}`}
            >
                <p>
                    <BsCarFrontFill size={23} />
                </p>
                <span className="text-lg hidden md:block font-medium">Vehicles Sales</span>
            </div>
            <div
                onClick={() => setSelect(6)}
                className={`flex gap-2 items-center cursor-pointer ${select === 6 ? "text-blue-700" : "text-gray-700"}`}
            >
                <p>
                    <MdOutlineBusinessCenter size={23} />
                </p>
                <span className="text-lg hidden md:block font-medium">Products</span>
            </div>
            <div onClick={handleSignOut} className={`flex gap-2 items-center cursor-pointer text-gray-700`}>
                <p>
                    <GoSignOut size={23} />
                </p>
                <span className="text-lg hidden md:block font-medium">SignOut</span>
            </div>
        </div>
    );
};

export default ProfileSideBar;
