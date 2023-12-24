import React, { useEffect, useState } from "react";
import { styles } from "@/app/styles/styles";
import axios from "axios";
import { toast } from "react-hot-toast";

const BioCard = ({ data, button, biodata, setOpen, setData }) => {
    const {
        _id,
        full_name,
        email,
        date_of_birth,
        education,
        marital_status,
        occupation,
        religion,
        height,
        weight,
        photo,
        flag,
        skin_color,
    } = data;
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState([]);

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data.email);
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleOpen = () => {
        setOpen(true);
        setData(data);
    };

    const result = [];
    const senderBio = biodata.map((data) => {
        if (data.email === user && data.isApproved) {
            const temp = data._id.slice(-7);
            result.push(temp);
        }
    });

    const handleContactInfo = (id) => {
        const data = {
            reciever: biodata.find((data) => data._id === id).email,
            sender: user,
            for_bio: id.slice(-7),
            sender_bio: result,
        };

        axios
            .post("/api/request/register", data)
            .then(() => {
                toast.success("Sent request succesfully!");
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
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
    }, []);

    return (
        <div className="bg-slate-200  dark:bg-slate-100 text-gray-700 p-1 rounded-md w-full flex flex-col ">
            <div className="relative">
                <img src={photo} alt="photo" className="h-40 w-full object-cover rounded-md" />
                <span className="absolute left-1 top-1 bg-gray-700 rounded w-9 text-white text-center p-1" role="img" aria-label={flag}>
                    {flag}
                </span>
                <span className="text-sm absolute top-1 right-1 bg-gray-700 rounded text-white text-center p-1">{_id.slice(-7).toUpperCase()}</span>
            </div>
            <div className="mt-2 h-40 text-sm">
                <div className="flex justify-between items-center mb-0.5">
                    <p className="text-base font-semibold">{full_name}</p>
                    <p className="font-mono text-lg">{marital_status}</p>
                </div>
                <div className="flex justify-between items-center mb-0.5">
                    <p>Date of Birth: {date_of_birth.slice(0, 10)}</p>
                    <p>Religion:  {religion}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="mb-0.5">
                        <p>Education: {education}</p>
                        <p>Occupation: {occupation}</p>
                    </div>
                    <div>
                        <p>Height: {height} cm</p>
                        <p>Weight: {weight} kg</p>
                    </div>
                </div>
            </div>
            {button && (
                <div className="flex justify-center gap-2">
                    <p onClick={handleOpen} className={`${styles.button}`}>
                        See Details
                    </p>
                    {user && (
                        <p
                            onClick={() => handleContactInfo(data._id)}
                            className={`${styles.button} ${
                                request.find((req) => req.for_bio === data._id.slice(-7)) &&
                                "!cursor-not-allowed !bg-gray-500"
                            }`}
                        >
                            Request
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BioCard;
