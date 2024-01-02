/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "../styles/styles";
import axios from "axios";

const Hero = () => {
    const [biodata, setBiodata] = useState([]);
    const [products, setProducts] = useState([]);
    const [rent, setRent] = useState([]);
    const [sales, setSales] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            setData(res.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);



    useEffect(() => {
        axios
            .get("/api/biodata/getbiodata")
            .then((response) => {
                setBiodata(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching biodata:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/business/getbusiness")
            .then((response) => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);


    useEffect(() => {
        axios
            .get("/api/rent/getrent")
            .then((response) => {
                setRent(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching rent:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/sales/getsales")
            .then((response) => {
                setSales(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching sales:", error);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/vehicle/getvehicle")
            .then((response) => {
                setVehicles(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching vehicles:", error);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/users/allUsers")
            .then((response) => {
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching vehicles:", error);
                setLoading(false);
            });
    }, []);


    return (
        <div>
            <div>
                <div className="h-[517px] w-full rounded-md overflow-hidden mb-1 flex justify-center items-center bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgbdl=pexels-johannes-plenio-1103970.jpg&fm=jpg')] bg-cover">
                    {/* <div className="flex bg-teal-700 gap-3 p-1 rounded">
                        <Link href="category/marriage-s-d">
                            <img
                                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 p-2 bg-gray-300 rounded"
                                src="https://i.ibb.co/CKbLfqN/1.png"
                                alt=""
                            />
                        </Link>
                        <Link href="category/h-o-s-rent">
                            <img
                                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 p-2 bg-gray-300 rounded"
                                src="https://i.ibb.co/ckrL6Yc/png-clipart-car-computer-icons-sedan-auto-detailing-auto-driving-rectangle-thumbnail-removebg-previe.png"
                                alt=""
                            />
                        </Link>
                        <Link href="category/l-b-o-sale">
                            <img
                                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 p-2 bg-gray-300 rounded"
                                src="https://i.ibb.co/w7RH0vG/3.png"
                                alt=""
                            />
                        </Link>
                        <Link href="category/business-product">
                            <img
                                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 p-2 bg-gray-300 rounded"
                                src="https://i.ibb.co/HBwkDV2/4.png"
                                alt=""
                            />
                        </Link>
                    </div> */}
                    <p className="text-6xl font-bold">Welcome to Match Making Website</p>
                </div>

                <div className="flex flex-col md:flex-row md:gap-6 mb-1 md:pr-6 md:items-center rounded-md p-1 bg-slate-300">
                    <div className="basis-1/3">
                        <img
                            className="h-60 md:h-52 lg:h-72 w-full rounded-md"
                            src="https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_1280.jpg"
                            alt=""
                        />
                    </div>
                    <div className="text-neutral-800 basis-2/3">
                        <h1 className="text-2xl font-semibold mt-4 md:mt-0 mb-2 md:mb-0">Marriage</h1>
                        <p className="text-justify">

                            Marriage, an age-old institution, weaves two souls into a tapestry of shared dreams and aspirations. It&apos;s more than a union of hearts; it&apos;s a commitment to weather life&apos;s storms hand in hand. Through peaks and valleys, marriages evolve, nurturing trust, understanding, and profound companionship. Each promise exchanged is a beacon of hope, anchoring souls in a bond of enduring love. Yet, like any journey, it demands patience, compromise, and unwavering support. In the dance of life, marriage stands as a testament to the human spirit&apos;s quest for connection, reminding us that together, we are stronger, wiser, and infinitely more resilient.
                        </p>
                        {data ? <Link href="category/marriage-s-d">
                            <button className={`${styles.button} !mt-3 md:max-w-xs`}>Visit More</button>
                        </Link> : <Link href="/login">
                            <button className={`${styles.button} !mt-3 md:max-w-xs`}>Visit More</button>
                        </Link>}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse md:gap-6 mb-1 md:pl-6 md:items-center rounded-md p-1 bg-slate-300">
                    <div className="basis-1/3">
                        <img
                            className="h-60 md:h-52 lg:h-72 w-full rounded-md"
                            src="https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?cs=srgb&dl=pexels-mike-bird-3729464.jpg&fm=jpg"
                            alt=""
                        />
                    </div>
                    <div className="text-neutral-800 basis-2/3">
                        <h1 className="text-2xl font-semibold mt-4 md:mt-0 mb-2 md:mb-0">Car Booking</h1>
                        <p className="text-justify">
                            Appointing a car for one&apos;s needs offers a blend of convenience and flexibility. Whether for a special occasion, a business trip, or simply to navigate unfamiliar terrains, a hired car bridges the gap between destinations and desires. With a myriad of options, from compact sedans to luxurious SUVs, one can tailor the choice to fit specific requirements. Beyond mere transportation, appointing a car can elevate experiences, allowing travelers to explore at their own pace and in their preferred style. In the realm of modern mobility, the freedom and autonomy a hired car bestows are invaluable, transforming journeys into memorable adventures.
                        </p>
                        {data ? <Link href="category/vehicle-sales">
                            <button className={`${styles.button} !mt-3 md:max-w-xs`}>Visit More</button>
                        </Link> : <Link href="/login">
                            <button className={`${styles.button} !mt-3 md:max-w-xs`}>Visit More</button>
                        </Link>}
                    </div>
                </div>

                {/* <div className="flex flex-col md:flex-row md:gap-6 mb-1 md:pr-6 md:items-center rounded-md p-1 bg-slate-300">
                    <div className="w-full">
                        <img
                            className="h-60 md:h-52 lg:h-72 w-full rounded-md"
                            src="https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
                            alt=""
                        />
                    </div>
                    <div className="text-neutral-800">
                        <h1 className="text-2xl font-semibold mt-4 md:mt-0 mb-2 md:mb-0">Export From Vehicle</h1>
                        <p className="text-justify">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, laborum fugit! Adipisci
                            fuga dolor autem earum inventore commodi. Nihil est necessitatibus incidunt soluta, alias
                            magni nulla facere harum, unde praesentium, eos distinctio quidem tempora dicta? Esse
                            dolorem molestias voluptatum enim mollitia temporibus recusandae sed similique illo, beatae,
                            dolores deleniti impedit!
                        </p>
                        <Link href="category/l-b-o-sale">
                            <button className={`${styles.button} !mt-3 md:max-w-xs`}>Visit More</button>
                        </Link>
                    </div>
                </div> */}

                {/* <div className="flex flex-col md:flex-row-reverse md:gap-6 mb-1 md:pl-6 md:items-center rounded-md p-1 bg-slate-300">
                    <div className="w-full">
                        <img
                            className="h-60 md:h-52 lg:h-72 w-full rounded-md"
                            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                            alt=""
                        />
                    </div>
                    <div className="text-neutral-800">
                        <h1 className="text-2xl font-semibold mt-4 md:mt-0 mb-2 md:mb-0">Export From Vehicle</h1>
                        <p className="text-justify">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, laborum fugit! Adipisci
                            fuga dolor autem earum inventore commodi. Nihil est necessitatibus incidunt soluta, alias
                            magni nulla facere harum, unde praesentium, eos distinctio quidem tempora dicta? Esse
                            dolorem molestias voluptatum enim mollitia temporibus recusandae sed similique illo, beatae,
                            dolores deleniti impedit!
                        </p>
                        <Link href="category/business-product">
                            <button className={`${styles.button} !mt-3 md:max-w-xs`}>Visit More</button>
                        </Link>
                    </div>
                </div> */}

                {/* <div className="flex flex-col md:flex-row md:gap-6 mb-1 md:pr-6 md:items-center rounded-md p-1 bg-slate-300">
                    <div className="w-full">
                        <img
                            className="h-60 md:h-52 lg:h-72 w-full rounded-md"
                            src="https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
                            alt=""
                        />
                    </div>
                    <div className="text-neutral-800">
                        <h1 className="text-2xl font-semibold mt-4 md:mt-0 mb-2 md:mb-0">Export From Vehicle</h1>
                        <p className="text-justify">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, laborum fugit! Adipisci
                            fuga dolor autem earum inventore commodi. Nihil est necessitatibus incidunt soluta, alias
                            magni nulla facere harum, unde praesentium, eos distinctio quidem tempora dicta? Esse
                            dolorem molestias voluptatum enim mollitia temporibus recusandae sed similique illo, beatae,
                            dolores deleniti impedit!
                        </p>
                        <Link href="category/business-product">
                            <button className={`${styles.button} !mt-3 md:max-w-xs`}>Visit More</button>
                        </Link>
                    </div>
                </div> */}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 my-4">
                <div className={` flex flex-col py-2 bg-blue-600 rounded-md text-white font-medium items-center justify-center`} >
                    <p>{users.length}</p>
                    <p >Total User</p>
                </div>
                <div className={` flex flex-col py-2 bg-blue-600 rounded-md text-white font-medium items-center justify-center`} >
                    <p>{biodata.length}</p>
                    <p >Marriage Post</p>
                </div>
                {/* <div className={` flex flex-col py-2 bg-blue-600 rounded-md text-white font-medium items-center justify-center`} >
                    <p>{rent.length}</p>
                    <p >Car Post</p>
                </div> */}
                {/* <div className={` flex flex-col py-2 bg-blue-600 rounded-md text-white font-medium items-center justify-center`} >
                    <p>{sales.length}</p>
                    <p >L.B.O Post</p>
                </div> */}
                <div className={` flex flex-col py-2 bg-blue-600 rounded-md text-white font-medium items-center justify-center`} >
                    <p>{vehicles.length}</p>
                    <p >Car Post</p>
                </div>
                {/* <div className={` flex flex-col py-2 bg-blue-600 rounded-md text-white font-medium items-center justify-center`} >
                    <p>{products.length}</p>
                    <p >Product Post</p>
                </div> */}
            </div>

            <div className="h-96 w-full rounded-md relative overflow-hidden mb-1 flex justify-center items-center bg-[url('https://media.istockphoto.com/id/1072438832/photo/crowd-of-happy-people-with-arms-outstretched-looking-at-camera.jpg?s=170667a&w=0&k=20&c=W0yBzU3kUdKwko0ijKzJAY3sefUahihjAzlT4zBCr5c=')] bg-cover">
                <div className="absolute w-full h-96 top-0 left-0 bg-black opacity-50 z-0 rounded-md"></div>
                <div className="text-white z-50 flex flex-col justify-center items-center">
                    <h1 className="my-3 text-xl lg:text-2xl font-semibold">
                        You can make a difference today
                    </h1>
                    <h1 className="mb-3">There&apos;s a lot more we can do, together</h1>
                    {data ? null :  <Link href="/login">
                        <button className={`${styles.button} !max-w-xs`}>SIGN UP NOW</button>
                    </Link>}
                 
                </div>
            </div>
        </div>
    );
};

export default Hero;
