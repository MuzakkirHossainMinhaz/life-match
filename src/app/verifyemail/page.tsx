"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-medium">Verify Email</h1>
            <h1 className="p-2 text-orange-500">{token ? `${token}` : "no token"}</h1>

            {verified && (
                <div className="flex flex-col justify-center items-center gap-2 my-2">
                    <h2 className="text-lg text-green-700 font-semibold">Your email verified successfully.</h2>
                    <Link className="btn py-1 px-2 border-[1px] border-gray-400 text-gray-700 rounded" href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-lg text-red-700 font-semibold">Token Expired.</h2>
                </div>
            )}
        </div>
    );
}
