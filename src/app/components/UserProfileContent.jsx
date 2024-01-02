'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import BioCard from "./Biodata/BioCard";
import RentCard from "./Rent/RentCard";
import SalesCard from "./Sales/SalesCard";
import VehiclesCard from "./Vehicles/VehiclesCard";
import ProductsCard from "./Products/ProductsCard";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { styles } from "../styles/styles";

const UserProfileContent = ({ select, data }) => {


    return (
        <div className="w-full p-4 bg-white rounded-md h-[calc(100vh-88px)] md:h-[calc(100vh-128px)] lg:h-[calc(100vh-104px)] overflow-scroll">
            {select === 1 && <Profile data={data} />}
            {select === 20 && <Dashboard />}
            {select === 2 && !data.isAdmin && <Biodata email={data.email} />}
            {select === 3 && !data.isAdmin && <Rent email={data.email} />}
            {select === 4 && !data.isAdmin && <Sales email={data.email} />}
            {select === 5 && !data.isAdmin && <Vehicles email={data.email} />}
            {select === 6 && !data.isAdmin && <Products email={data.email} />}
            {select === 2 && data.isAdmin && <AdminBiodata />}
            {select === 3 && data.isAdmin && <AdminRent />}
            {select === 4 && data.isAdmin && <AdminSales />}
            {select === 5 && data.isAdmin && <AdminVehicles />}
            {select === 6 && data.isAdmin && <AdminProducts />}
        </div>
    );
};

export default UserProfileContent;

const Profile = ({ data }) => {
    const { fullname, isVerified, email, avatar, phone, isAdmin } = data;

    return (
        <div className="flex justify-center items-center w-full">
            <div className="bg-white shadow rounded p-3 md:p-4 lg:p-6 min-w-[50%]">
                <div className="relative">
                    <img className="w-40 h-40 object-cover mb-4 rounded-full mx-auto" src={avatar} alt="avatar" />

                    <span className="absolute top-0 right-0">
                        {isVerified ? (
                            <span className="text-white bg-green-700 rounded-full px-3 py-1">verified</span>
                        ) : (
                            <span className="text-white bg-red-700 rounded-full px-3 py-1">not verified</span>
                        )}
                    </span>
                    <span className="absolute top-0 left-0">
                        {isAdmin && <span className="text-white bg-blue-700 rounded-full px-3 py-1">admin</span>}
                    </span>
                </div>

                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        readOnly
                        placeholder={fullname}
                        className={`${styles.input} w-full outline-none`}
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        readOnly
                        placeholder={email}
                        className={`${styles.input} w-full outline-none`}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        readOnly
                        placeholder={phone}
                        className={`${styles.input} w-full outline-none`}
                    />
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [biodata, setBiodata] = useState([]);
    const [products, setProducts] = useState([]);
    const [rent, setRent] = useState([]);
    const [sales, setSales] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);

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
       <div className="w-full h-full flex justify-center items-center">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center items-center w-48 h-28 md:h-40 lg:h-48 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-2xl rounded-md">
                <p>{biodata.length}</p>
                <p>Marriage Post</p>
            </div>
            {/* <div className="flex flex-col justify-center items-center w-48  h-28 md:h-40 lg:h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white font-semibold text-2xl rounded-md">
                <p>{rent.length}</p>
                <p>H.O.S Post</p>
            </div> */}
            {/* <div className="flex flex-col justify-center items-center w-48  h-28 md:h-40 lg:h-48 bg-gradient-to-r from-indigo-500  to-emerald-500 text-white font-semibold text-2xl rounded-md">
                <p>{sales.length}</p>
                <p>L.B.O Post</p>
            </div> */}
            <div className="flex flex-col justify-center w-48  h-28 md:h-40 lg:h-48 items-center bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold text-2xl rounded-md">
                <p>{vehicles.length}</p>
                <p>Vehicles Post</p>
            </div>
            {/* <div className="flex flex-col justify-center items-center w-48  h-28 md:h-40 lg:h-48 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-2xl rounded-md">
                <p>{products.length}</p>
                <p>Product Post</p>
            </div> */}
        </div>
       </div>
    )
}

const Biodata = ({ email }) => {
    const [biodata, setBiodata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [tab, setTab] = useState(1);
    const [request, setRequest] = useState([]);

    useEffect(() => {
        axios
            .get("/api/biodata/profile")
            .then((response) => {
                setBiodata(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching biodata:", error);
                setLoading(false);
            });
    }, []);

    const handleTab = (value) => {
        setTab(value);
    };

    const getRequest = () => {
        axios
            .get("/api/request/getRequest")
            .then((response) => {
                setRequest(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching biodata:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getRequest();
    }, []);

    const handleBioAccept = (id, sender, rid) => {
        setLoading(true);
        axios
            .post("/api/request/accept", { id, sender, rid })
            .then((response) => {
                toast.success("Accepted");
                setLoading(false);
                getRequest();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    const handleBioDelete = (id) => {
        setLoading(true);
        axios
            .post("/api/request/delete", { id })
            .then((response) => {
                toast.success("Deleted");
                setLoading(false);
                getRequest();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    console.log(request)
    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52 h-screen">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className="flex gap-4 mb-4">
                                <p onClick={() => handleTab(1)} className={`${styles.button}`}>
                                    Biodata
                                </p>
                                <p onClick={() => handleTab(2)} className={`${styles.button}`}>
                                    Request
                                </p>
                            </div>
                            {tab === 1 && (
                                <>
                                    {biodata.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2">
                                            {biodata.map((data, index) => (
                                                <div key={index} className="relative">
                                                    <p className="absolute top-2 z-50 right-2">
                                                        {data.isApproved ? (
                                                            <span className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                                accepted
                                                            </span>
                                                        ) : (
                                                            <span className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                                pending
                                                            </span>
                                                        )}
                                                    </p>
                                                    <BioCard
                                                        data={data}
                                                        button={false}
                                                        biodata={biodata}
                                                        setOpen={setOpen}
                                                        setData={setData}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-gray-700">
                                            <p>You did not create any post yet!</p>
                                        </div>
                                    )}
                                </>
                            )}
                            {tab === 2 && (
                                <div className="text-gray-700">
                                    <div>
                                        <p className="font-medium text-lg">Recieved:</p>
                                        <table className="table w-full">
                                            <tr className="table-row">
                                                <th>#</th>
                                                <th>Sender</th>
                                                <th>Action</th>
                                            </tr>
                                            {request
                                                .filter((req) => req.reciever === email)
                                                .map((req, idx) => (
                                                    <tr key={idx} className="table-row text-center">
                                                        <td>{idx + 1}</td>
                                                        <td className="lowercase">{req.sender}</td>
                                                        <td className="flex gap-2 justify-center">
                                                            <p
                                                                className="bg-green-600 px-4 py-1 rounded-md text-white cursor-pointer"
                                                                onClick={() =>
                                                                    handleBioAccept(req.for_bio, req.sender, req._id)
                                                                }
                                                            >
                                                                accept
                                                            </p>
                                                            <p
                                                                className="bg-red-600 px-4 py-1 rounded-md text-white cursor-pointer"
                                                                onClick={() => handleBioDelete(req._id)}
                                                            >
                                                                delete
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </table>
                                    </div>

                                    <div>
                                        <p className="font-medium text-lg mt-4">Sent:</p>
                                        <table className="table w-full">
                                            <tr className="table-row">
                                                <th>#</th>
                                                <th>For Bio</th>
                                                <th>Action</th>
                                            </tr>
                                            {request
                                                .filter((req) => req.sender === email)
                                                .map((req, idx) => (
                                                    <tr key={idx} className="table-row text-center">
                                                        <td>{idx + 1}</td>
                                                        <td>{req?.for_bio}</td>
                                                        <td></td>
                                                    </tr>
                                                ))}
                                        </table>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

const Rent = () => {
    const [rent, setRent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("/api/rent/profile")
            .then((response) => {
                setRent(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching rent:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52 h-screen">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {rent.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2">
                                    {rent.map((data, index) => (
                                        <div key={index} className="relative">
                                            <p className="absolute top-2 right-2">
                                                {data.isApproved ? (
                                                    <span className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                        accepted
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                        pending
                                                    </span>
                                                )}
                                            </p>
                                            <RentCard data={data} setOpen={setOpen} setData={setData} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-700">
                                    <p>You did not create any post yet!</p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Area: <span className="font-semibold">{data.area}</span>
                                    </p>
                                    <p>
                                        Land Type: <span className="font-semibold"> {data.land_type}</span>
                                    </p>
                                    <p>
                                        Advance Pay: <span className="font-semibold"> {data.advance_pay}</span>
                                    </p>
                                    <p>
                                        Monthly Rent: <span className="font-semibold"> {data.monthly_rent}</span>
                                    </p>
                                    <p>
                                        Number of Rooms: <span className="font-semibold"> {data.room}</span>
                                    </p>
                                    <p>
                                        Number of Bathrooms: <span className="font-semibold"> {data.bathroom}</span>
                                    </p>
                                    <p>
                                        Number of Kitchen: <span className="font-semibold"> {data.kitchen}</span>
                                    </p>
                                    <p>
                                        Number of Balcony: <span className="font-semibold"> {data.balcony}</span>
                                    </p>
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">Address:</span>
                                    </p>
                                    <p>
                                        Street: <span className="font-semibold"> {data.street}</span>
                                    </p>
                                    <p>
                                        City/Town: <span className="font-semibold"> {data.city}</span>
                                    </p>
                                    <p>
                                        State: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Postal Code: <span className="font-semibold"> {data.postal_code}</span>
                                    </p>
                                    <p>
                                        Country:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.state}, {data.country}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("/api/sales/profile")
            .then((response) => {
                setSales(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching sales:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {sales.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2">
                                    {sales.map((data, index) => (
                                        <div key={index} className="relative">
                                            <p className="absolute top-2 right-2">
                                                {data.isApproved ? (
                                                    <span className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                        accepted
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                        pending
                                                    </span>
                                                )}
                                            </p>
                                            <SalesCard data={data} setOpen={setOpen} setData={setData} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-700">
                                    <p>You did not create any post yet!</p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Property Owner: <span className="font-semibold">{data.property_owner}</span>
                                    </p>
                                    <p>
                                        Number of Property Partners:{" "}
                                        <span className="font-semibold"> {data.property_partners}</span>
                                    </p>
                                    <p>
                                        Property Address:{" "}
                                        <span className="font-semibold"> {data.property_address}</span>
                                    </p>
                                    <p>
                                        Property Name: <span className="font-semibold"> {data.property_name}</span>
                                    </p>
                                    <p>
                                        Selling Price: <span className="font-semibold"> {data.selling_price}</span>
                                    </p>
                                    <p>
                                        Property Type: <span className="font-semibold"> {data.residential}</span>
                                    </p>
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">Address:</span>
                                    </p>
                                    <p>
                                        Street: <span className="font-semibold"> {data.street}</span>
                                    </p>
                                    <p>
                                        City/Town: <span className="font-semibold"> {data.city}</span>
                                    </p>
                                    <p>
                                        State: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Postal Code: <span className="font-semibold"> {data.postal_code}</span>
                                    </p>
                                    <p>
                                        Country:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.state}, {data.country}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    {data?.social_media && <p>Social Medias: {data?.social_media}</p>}
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("/api/vehicle/profile")
            .then((response) => {
                setVehicles(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching vehicles:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52">
                            {" "}
                            <Loader />{" "}
                        </div>
                    ) : (
                        <>
                            {vehicles.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {vehicles.map((data, index) => (
                                        <div key={index} className="relative">
                                            <p className="absolute top-2 right-2">
                                                {data.isApproved ? (
                                                    <span className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                        accepted
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                        pending
                                                    </span>
                                                )}
                                            </p>
                                            <VehiclesCard data={data} setOpen={setOpen} setData={setData} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-700">
                                    <p>You did not create any post yet!</p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Vehicle Name: <span className="font-semibold">{data.vehicle_name}</span>
                                    </p>
                                    <p>
                                        Vehicle Model: <span className="font-semibold"> {data.vehicle_model}</span>
                                    </p>
                                    <p>
                                        Date of Puchase:{" "}
                                        <span className="font-semibold"> {data.date_of_purchase.slice(0, 10)}</span>
                                    </p>
                                    <p>
                                        Vehicle Type: <span className="font-semibold"> {data.vehicle_type}</span>
                                    </p>
                                    <p>
                                        Price: <span className="font-semibold"> {data.price}</span>
                                    </p>
                                    <p>
                                        Documents Correct: <span className="font-semibold"> {data.docs_correct}</span>
                                    </p>
                                    <p>
                                        Seller Type: <span className="font-semibold"> {data.seller_type}</span>
                                    </p>
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">Address:</span>
                                    </p>
                                    <p>
                                        Street: <span className="font-semibold"> {data.street}</span>
                                    </p>
                                    <p>
                                        City/Town: <span className="font-semibold"> {data.city}</span>
                                    </p>
                                    <p>
                                        State: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Postal Code: <span className="font-semibold"> {data.postal_code}</span>
                                    </p>
                                    <p>
                                        Sate: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Country: <span className="font-semibold"> {data.country}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    {data?.website_url && <p>Website URL: {data?.website_url}</p>}
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("/api/business/profile")
            .then((response) => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52">
                            {" "}
                            <Loader />{" "}
                        </div>
                    ) : (
                        <>
                            {products.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {products.map((data, index) => (
                                        <div key={index} className="relative">
                                            <p className="absolute top-2 right-2">
                                                {data.isApproved ? (
                                                    <span className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                        accepted
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit">
                                                        pending
                                                    </span>
                                                )}
                                            </p>
                                            <ProductsCard data={data} setOpen={setOpen} setData={setData} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-700">
                                    <p>You did not create any post yet!</p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Number of Products:{" "}
                                        <span className="font-semibold">{data.products_quantity}</span>
                                    </p>
                                    <p>
                                        Product Price: <span className="font-semibold"> {data.products_price}</span>
                                    </p>
                                    {data.company_name && (
                                        <p>
                                            Company Name: <span className="font-semibold"> {data.company_name}</span>
                                        </p>
                                    )}
                                    {data.company_registered_address && (
                                        <p>
                                            Company Registered Address:{" "}
                                            <span className="font-semibold"> {data.company_registered_address}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">Address:</span>
                                    </p>
                                    <p>
                                        Street: <span className="font-semibold"> {data.street}</span>
                                    </p>
                                    <p>
                                        City/Town: <span className="font-semibold"> {data.city}</span>
                                    </p>
                                    <p>
                                        State: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Postal Code: <span className="font-semibold"> {data.postal_code}</span>
                                    </p>
                                    <p>
                                        Sate: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Country: <span className="font-semibold"> {data.country}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    {data?.company_website_url && (
                                        <p>
                                            Website URL:{" "}
                                            <a
                                                href={`http://${data?.company_website_url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {data?.company_website_url}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminBiodata = () => {
    const [biodata, setBiodata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    const getData = () => {
        axios
            .get("/api/biodata/adminprofile")
            .then((response) => {
                setBiodata(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching biodata:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAccept = (id) => {
        setLoading(true);
        axios
            .post("/api/biodata/accept", { id })
            .then((response) => {
                toast.success("Accepted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        setLoading(true);
        axios
            .post("/api/biodata/delete", { id })
            .then((response) => {
                toast.success("Deleted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52 h-screen">
                            {" "}
                            <Loader />{" "}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2">
                            {biodata.map((data, index) => (
                                <div key={index} className="relative">
                                    {!data.isApproved && (
                                        <p className="absolute top-2 right-2 flex gap-2 z-20">
                                            <span
                                                onClick={() => handleAccept(data._id)}
                                                className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                accept
                                            </span>
                                            <span
                                                onClick={() => handleDelete(data._id)}
                                                className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                delete
                                            </span>
                                        </p>
                                    )}
                                    <BioCard
                                        biodata={biodata}
                                        button={true}
                                        data={data}
                                        setOpen={setOpen}
                                        setData={setData}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div>
                                <img className="w-60 h-60 object-cover rounded-md" src={data.photo} alt="photo" />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Full Name: <span className="font-semibold">{data.full_name}</span>
                                    </p>
                                    <p>
                                        Date of Birth:{" "}
                                        <span className="font-semibold">{data.date_of_birth.slice(0, 10)}</span>
                                    </p>
                                    <p>
                                        Blood Group: <span className="font-semibold"> {data.blood_group}</span>
                                    </p>
                                    <p>
                                        Gender: <span className="font-semibold"> {data.gender}</span>
                                    </p>
                                    <p>
                                        Marital Status: <span className="font-semibold"> {data.marital_status}</span>
                                    </p>
                                    <p>
                                        Education: <span className="font-semibold"> {data.education}</span>
                                    </p>
                                    <p>
                                        Occupation: <span className="font-semibold"> {data.occupation}</span>
                                    </p>
                                    <p>
                                        Religion: <span className="font-semibold"> {data.religion}</span>
                                    </p>
                                    <div className="flex justify-between">
                                        <p>
                                            Height: <span className="font-semibold"> {data.height} cm</span>
                                        </p>
                                        <p>
                                            Weight: <span className="font-semibold"> {data.weight} kg</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Father&apos;s Name: <span className="font-semibold"> {data.father_name}</span>
                                    </p>
                                    <p>
                                        Father&apos;s Occupation:{" "}
                                        <span className="font-semibold"> {data.father_occupation}</span>
                                    </p>
                                    <p>
                                        Mother&apos;s Name: <span className="font-semibold"> {data.mother_name}</span>
                                    </p>
                                    <p>
                                        Mother&apos;s Occupation:{" "}
                                        <span className="font-semibold"> {data.mother_occupation}</span>
                                    </p>
                                    <p>
                                        Number of Brothers: <span className="font-semibold"> {data.brothers}</span>
                                    </p>
                                    <p>
                                        Number of Sisters: <span className="font-semibold"> {data.sisters}</span>
                                    </p>
                                    <p>
                                        Guardian: <span className="font-semibold"> {data.guardian}</span>
                                    </p>
                                    <p>
                                        Address:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.street}, {data.city}, {data.postal_code}
                                        </span>
                                    </p>
                                    <p>
                                        Country:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.state}, {data.country}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    <p>Social Links: {data?.social_media}</p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminRent = () => {
    const [rent, setRent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    const getData = () => {
        axios
            .get("/api/rent/adminprofile")
            .then((response) => {
                setRent(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAccept = (id) => {
        setLoading(true);
        axios
            .post("/api/rent/accept", { id })
            .then((response) => {
                toast.success("Accepted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        setLoading(true);
        axios
            .post("/api/rent/delete", { id })
            .then((response) => {
                toast.success("Deleted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52 h-screen">
                            {" "}
                            <Loader />{" "}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2">
                            {rent.map((data, index) => (
                                <div key={index} className="relative">
                                    {!data.isApproved && (
                                        <p className="absolute top-2 right-2 flex gap-2 z-20">
                                            <span
                                                onClick={() => handleAccept(data._id)}
                                                className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                accept
                                            </span>
                                            <span
                                                onClick={() => handleDelete(data._id)}
                                                className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                delete
                                            </span>
                                        </p>
                                    )}
                                    <RentCard data={data} setOpen={setOpen} setData={setData} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Area: <span className="font-semibold">{data.area}</span>
                                    </p>
                                    <p>
                                        Land Type: <span className="font-semibold"> {data.land_type}</span>
                                    </p>
                                    <p>
                                        Advance Pay: <span className="font-semibold"> {data.advance_pay}</span>
                                    </p>
                                    <p>
                                        Monthly Rent: <span className="font-semibold"> {data.monthly_rent}</span>
                                    </p>
                                    <p>
                                        Number of Rooms: <span className="font-semibold"> {data.room}</span>
                                    </p>
                                    <p>
                                        Number of Bathrooms: <span className="font-semibold"> {data.bathroom}</span>
                                    </p>
                                    <p>
                                        Number of Kitchen: <span className="font-semibold"> {data.kitchen}</span>
                                    </p>
                                    <p>
                                        Number of Balcony: <span className="font-semibold"> {data.balcony}</span>
                                    </p>
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">Address:</span>
                                    </p>
                                    <p>
                                        Street: <span className="font-semibold"> {data.street}</span>
                                    </p>
                                    <p>
                                        City/Town: <span className="font-semibold"> {data.city}</span>
                                    </p>
                                    <p>
                                        State: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Postal Code: <span className="font-semibold"> {data.postal_code}</span>
                                    </p>
                                    <p>
                                        Country:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.state}, {data.country}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminSales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    const getData = () => {
        axios
            .get("/api/sales/adminprofile")
            .then((response) => {
                setSales(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAccept = (id) => {
        setLoading(true);
        axios
            .post("/api/sales/accept", { id })
            .then((response) => {
                toast.success("Accepted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        setLoading(true);
        axios
            .post("/api/sales/delete", { id })
            .then((response) => {
                toast.success("Deleted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52">
                            {" "}
                            <Loader />{" "}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2">
                            {sales.map((data, index) => (
                                <div key={index} className="relative">
                                    {!data.isApproved && (
                                        <p className="absolute top-2 right-2 flex gap-2 z-20">
                                            <span
                                                onClick={() => handleAccept(data._id)}
                                                className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                accept
                                            </span>
                                            <span
                                                onClick={() => handleDelete(data._id)}
                                                className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                delete
                                            </span>
                                        </p>
                                    )}
                                    <SalesCard data={data} setOpen={setOpen} setData={setData} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Property Owner: <span className="font-semibold">{data.property_owner}</span>
                                    </p>
                                    <p>
                                        Number of Property Partners:{" "}
                                        <span className="font-semibold"> {data.property_partners}</span>
                                    </p>
                                    <p>
                                        Property Address:{" "}
                                        <span className="font-semibold"> {data.property_address}</span>
                                    </p>
                                    <p>
                                        Property Name: <span className="font-semibold"> {data.property_name}</span>
                                    </p>
                                    <p>
                                        Selling Price: <span className="font-semibold"> {data.selling_price}</span>
                                    </p>
                                    <p>
                                        Property Type: <span className="font-semibold"> {data.residential}</span>
                                    </p>
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">Address:</span>
                                    </p>
                                    <p>
                                        Street: <span className="font-semibold"> {data.street}</span>
                                    </p>
                                    <p>
                                        City/Town: <span className="font-semibold"> {data.city}</span>
                                    </p>
                                    <p>
                                        State: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Postal Code: <span className="font-semibold"> {data.postal_code}</span>
                                    </p>
                                    <p>
                                        Country:{" "}
                                        <span className="font-semibold">
                                            {" "}
                                            {data.state}, {data.country}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    {data?.social_media && <p>Social Medias: {data?.social_media}</p>}
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    const getData = () => {
        axios
            .get("/api/vehicle/adminprofile")
            .then((response) => {
                setVehicles(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAccept = (id) => {
        setLoading(true);
        axios
            .post("/api/vehicle/accept", { id })
            .then((response) => {
                toast.success("Accepted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        setLoading(true);
        axios
            .post("/api/vehicle/delete", { id })
            .then((response) => {
                toast.success("Deleted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52">
                            {" "}
                            <Loader />{" "}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {vehicles.map((data, index) => (
                                <div key={index} className="relative">
                                    {!data.isApproved && (
                                        <p className="absolute top-2 right-2 flex gap-2 z-20">
                                            <span
                                                onClick={() => handleAccept(data._id)}
                                                className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                accept
                                            </span>
                                            <span
                                                onClick={() => handleDelete(data._id)}
                                                className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                delete
                                            </span>
                                        </p>
                                    )}
                                    <VehiclesCard data={data} setOpen={setOpen} setData={setData} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Vehicle Name: <span className="font-semibold">{data.vehicle_name}</span>
                                    </p>
                                    <p>
                                        Vehicle Model: <span className="font-semibold"> {data.vehicle_model}</span>
                                    </p>
                                    <p>
                                        Date of Puchase:{" "}
                                        <span className="font-semibold"> {data.date_of_purchase.slice(0, 10)}</span>
                                    </p>
                                    <p>
                                        Vehicle Type: <span className="font-semibold"> {data.vehicle_type}</span>
                                    </p>
                                    <p>
                                        Price: <span className="font-semibold"> {data.price}</span>
                                    </p>
                                    <p>
                                        Documents Correct: <span className="font-semibold"> {data.docs_correct}</span>
                                    </p>
                                    <p>
                                        Seller Type: <span className="font-semibold"> {data.seller_type}</span>
                                    </p>
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">Address:</span>
                                    </p>
                                    <p>
                                        Street: <span className="font-semibold"> {data.street}</span>
                                    </p>
                                    <p>
                                        City/Town: <span className="font-semibold"> {data.city}</span>
                                    </p>
                                    <p>
                                        State: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Postal Code: <span className="font-semibold"> {data.postal_code}</span>
                                    </p>
                                    <p>
                                        Sate: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Country: <span className="font-semibold"> {data.country}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    {data?.website_url && <p>Website URL: {data?.website_url}</p>}
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    const getData = () => {
        axios
            .get("/api/business/adminprofile")
            .then((response) => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAccept = (id) => {
        setLoading(true);
        axios
            .post("/api/business/accept", { id })
            .then((response) => {
                toast.success("Accepted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        setLoading(true);
        axios
            .post("/api/business/delete", { id })
            .then((response) => {
                toast.success("Deleted");
                setLoading(false);
                getData();
            })
            .catch((error) => {
                console.error("Error: ", error);
                setLoading(false);
            });
    };

    return (
        <div>
            {!open && (
                <>
                    {loading ? (
                        <div className="flex justify-center mt-52">
                            {" "}
                            <Loader />{" "}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {products.map((data, index) => (
                                <div key={index} className="relative">
                                    {!data.isApproved && (
                                        <p className="absolute top-2 right-2 flex gap-2 z-20">
                                            <span
                                                onClick={() => handleAccept(data._id)}
                                                className="bg-green-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                accept
                                            </span>
                                            <span
                                                onClick={() => handleDelete(data._id)}
                                                className="bg-red-700 text-white px-3 py-1 rounded-full flex justify-center items-center w-fit cursor-pointer"
                                            >
                                                delete
                                            </span>
                                        </p>
                                    )}
                                    <ProductsCard data={data} setOpen={setOpen} setData={setData} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {open && (
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className="bg-white h-fit container mx-auto rounded-md relative p-4">
                        <RxCross1 onClick={() => setOpen(false)} className="absolute top-2 right-2 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4 text-lg">
                            <div className="flex justify-center">
                                <img
                                    className="w-full md:w-[75%] lg:w-[40%] object-cover rounded-md"
                                    src={data.photo}
                                    alt="photo"
                                />
                            </div>
                            <div className="flex gap-4 w-full justify-center flex-col lg:flex-row">
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        Number of Products:{" "}
                                        <span className="font-semibold">{data.products_quantity}</span>
                                    </p>
                                    <p>
                                        Product Price: <span className="font-semibold"> {data.products_price}</span>
                                    </p>
                                    {data.company_name && (
                                        <p>
                                            Company Name: <span className="font-semibold"> {data.company_name}</span>
                                        </p>
                                    )}
                                    {data.company_registered_address && (
                                        <p>
                                            Company Registered Address:{" "}
                                            <span className="font-semibold"> {data.company_registered_address}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="flex-1 border-[1px] border-slate-300 p-4 rounded-md">
                                    <p>
                                        <span className="font-semibold">Address:</span>
                                    </p>
                                    <p>
                                        Street: <span className="font-semibold"> {data.street}</span>
                                    </p>
                                    <p>
                                        City/Town: <span className="font-semibold"> {data.city}</span>
                                    </p>
                                    <p>
                                        State: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Postal Code: <span className="font-semibold"> {data.postal_code}</span>
                                    </p>
                                    <p>
                                        Sate: <span className="font-semibold"> {data.state}</span>
                                    </p>
                                    <p>
                                        Country: <span className="font-semibold"> {data.country}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 p-4 rounded-md w-full">
                                <p className="font-semibold">Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    {data?.company_website_url && (
                                        <p>
                                            Website URL:{" "}
                                            <a
                                                href={`http://${data?.company_website_url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {data?.company_website_url}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="border-[1px] border-slate-300 w-full p-4 rounded-md">
                                <p className="font-semibold">Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
