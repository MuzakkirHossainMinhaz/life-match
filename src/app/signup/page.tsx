"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullname: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            router.push("/login");
            toast.success("Check your email for verification.");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length && user.fullname.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="text-black min-h-screen flex items-center justify-center bg-[url('https://www.womenbuildingaustralia.com.au/sites/default/files/images/Poly_BG_Grad%20%281%29_0_1.png')] bg-no-repeat bg-cover">
            <div className="flex flex-col dark:bg-yellow-50 bg-gray-200 p-4 rounded-md  justify-center  w-96 mx-auto">
                <h1 className="text-center text-2xl font-semibold">{loading ? "Processing" : "Register"}</h1>
                <br />
                <label htmlFor="fullname" className="my-3">
                    Full Name
                </label>
                <input
                    className="p-2 border-2 outline-blue-500 text-black rounded-lg"
                    type="text"
                    id="fullname"
                    value={user.fullname}
                    onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                    placeholder=""
                    required
                />
                <label htmlFor="email" className="my-3">
                    Email
                </label>
                <input
                    type="text"
                    className="p-2 border-2 outline-blue-500 text-black rounded-lg"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder=""
                    required
                />
                <label htmlFor="password" className="my-3">
                    Password
                </label>
                <input
                    type="password"
                    className="p-2 border-2 outline-blue-500 text-black rounded-lg"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder=""
                    required
                />
                <button
                    onClick={onSignup}
                    className={`btn bg-blue-700 text-white rounded-lg py-2 text-xl my-6 ${
                        buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Register
                </button>
                <p className="text-center mt-8">
                    Have an account?{" "}
                    <Link className="text-blue-700" href="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
