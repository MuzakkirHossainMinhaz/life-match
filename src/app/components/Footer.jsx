import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaCopyright } from "react-icons/fa";
import { styles } from "../styles/styles";

const Footer = () => {
    return (
        <div className="bg-slate-300 rounded-md ">
            <div className="flex justify-between gap-4 p-4 md:p-7 lg:p-10 text-gray-600">
                <div>
                    <h1 className={`${styles.text_link}`}>Useful Links</h1>
                    <p>Donate</p>
                    <p>Donate</p>
                    <p>Donate</p>
                    <p>Donate</p>
                </div>
                <div>
                    <h1 className={`${styles.text_link}`}>Useful Links</h1>
                    <p>Donate</p>
                    <p>Donate</p>
                    <p>Donate</p>
                    <p>Donate</p>
                </div>
                <div>
                    <h1 className={`${styles.text_link}`}>Useful Links</h1>
                    <p>Donate</p>
                    <p>Donate</p>
                    <p>Donate</p>
                    <p>Donate</p>
                </div>
                <div>
                    <h1 className={`${styles.text_link}`}>Useful Links</h1>
                    <p>Donate</p>
                    <p>Donate</p>
                    <p>Donate</p>
                    <p>Donate</p>
                </div>
            </div>
            <hr />
            <div className="flex justify-between items-center py-4 px-4 md:px-7 lg:px-10">
                <div>
                    <h1 className="text-blue-500 text-sm">
                        Copyright 2023 
                        <br />
                        All Rights Reserved.
                    </h1>
                </div>
                <div className="text-blue-500 flex gap-4 text-xl">
                    <FaInstagram />
                    <FaFacebook />
                    <FaTwitter />
                    <FaLinkedin />
                </div>
            </div>
        </div>
    );
};

export default Footer;
