"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            router.push("/profile");
            toast.success("Login Successful");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // dark:bg-yellow-50 bg-white

    return (
        <div className="text-black min-h-screen flex items-center justify-center bg-[url('https://www.womenbuildingaustralia.com.au/sites/default/files/images/Poly_BG_Grad%20%281%29_0_1.png')] bg-no-repeat bg-cover">
            <div className="flex flex-col dark:bg-yellow-50 bg-gray-200 p-4 rounded-md  justify-center  w-96 mx-auto">
                <h1 className="text-center text-2xl font-semibold">{loading ? "Processing" : "Login"}</h1>
                <br />

                <label htmlFor="email" className="my-3">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    className="p-2 border-2 outline-blue-500 text-black rounded-lg"
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
                    id="password"
                    className="p-2 border-2 outline-blue-500 text-black rounded-lg"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder=""
                    required
                />
                <button onClick={onLogin} className="btn bg-blue-700 text-white rounded-lg py-2 text-xl my-6">
                    Login
                </button>
                <p className="text-center mt-8">
                    New User?{" "}
                    <Link className="text-blue-700" href="/signup">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
