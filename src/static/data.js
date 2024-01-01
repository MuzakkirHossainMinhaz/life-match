import { BiMaleFemale } from "react-icons/bi";
import { BsCarFrontFill } from "react-icons/bs";
import { MdCarRental, MdPointOfSale, MdOutlineBusinessCenter } from "react-icons/md";

export const categories = [
    {
        id: 1,
        icon: <BiMaleFemale size={22} />,
        slug: "marriage-s-d",
        name: "Marriage Post",
    },
    // {
    //     id: 2,
    //     icon: <MdCarRental size={22} />,
    //     slug: "h-o-s-rent",
    //     name: "Car Rent",
    // },
    // {
    //     id: 3,
    //     icon: <MdPointOfSale size={22} />,
    //     slug: "l-b-o-sale",
    //     name: "L.B.O Sale",
    // },
    {
        id: 4,
        icon: <BsCarFrontFill size={22} />,
        slug: "vehicle-sales",
        name: "Car Rent",
    },
    // {
    //     id: 5,
    //     icon: <MdOutlineBusinessCenter size={22} />,
    //     slug: "business-product",
    //     name: "Business Product",
    // },
];
