"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import UserProfileSidebar from "@/app/components/UserProfileSidebar";
import UserProfileContent from "@/app/components/UserProfileContent";
import axios from "axios";

export default function ProfilePage() {
    const [select, setSelect] = useState(1);
    const [data, setData] = useState("");

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data);
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="container mx-auto">
            <Navbar />
            <div className="w-full flex gap-1 p-1 bg-slate-200 my-1 rounded-md">
                <div className="w-[60px] md:w-[250px] lg:w-[300px]">
                    <UserProfileSidebar data={data} select={select} setSelect={setSelect} />
                </div>
                <div className="w-full">
                    <UserProfileContent data={data} select={select} />
                </div>
            </div>
        </div>
    );
}
