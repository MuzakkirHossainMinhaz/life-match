import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Sales from "@/models/salesModel";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            property_owner,
            property_partners,
            property_address,
            property_name,
            selling_price,
            property_type,
            residential,
            name,
            photo,
            email,
            phone,
            street,
            city,
            state,
            postal_code,
            country,
            message,
            social_media,
            flag,
        } = reqBody;

        if (
            !property_owner ||
            !property_partners ||
            !property_address ||
            !property_name ||
            !selling_price ||
            !property_type ||
            !residential ||
            !name ||
            !photo ||
            !email ||
            !phone ||
            !street ||
            !city ||
            !state ||
            !postal_code ||
            !country ||
            !message ||
            !flag
        ) {
            console.log("dlkfjsdklfhsdkjflksadjf");

            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const newSales = new Sales({
            property_owner,
            property_partners,
            property_address,
            property_name,
            selling_price,
            property_type,
            residential,
            name,
            photo,
            email,
            phone,
            street,
            city,
            state,
            postal_code,
            country,
            message,
            social_media,
            flag,
        });

        const savedSales = await newSales.save();

        //send email
        await sendEmail({
            email,
            emailType: "",
            id: savedSales._id,
            subject: "Sales data registered!",
            html: `<p>By using this email (${email}) a sale info has been registered successfully in ${process.env.DOMAIN}</p>`,
        });

        return NextResponse.json({
            message: "Sales data created successfully",
            success: true,
            savedRent: savedSales,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
