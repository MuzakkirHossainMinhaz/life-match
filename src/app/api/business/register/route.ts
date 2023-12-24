import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Business from "@/models/businessModel";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            photo,
            products_quantity,
            products_price,
            social_media,
            company_name,
            company_registered_address,
            company_website_url,
            name,
            email,
            phone,
            street,
            city,
            state,
            postal_code,
            country,
            message,
            flag,
            product_name,
        } = reqBody;

        if (
            !photo ||
            !products_quantity ||
            !products_price ||
            !social_media ||
            !name ||
            !email ||
            !phone ||
            !street ||
            !state ||
            !postal_code ||
            !country ||
            !message ||
            !flag ||
            !product_name
        ) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const newBusiness = new Business({
            photo,
            products_quantity,
            products_price,
            social_media,
            company_name,
            company_registered_address,
            company_website_url,
            name,
            email,
            phone,
            street,
            city,
            state,
            postal_code,
            country,
            message,
            flag,
            product_name,
        });

        const savedBusiness = await newBusiness.save();

        //send email
        await sendEmail({
            email,
            emailType: "",
            id: savedBusiness._id,
            subject: "Business data registered!",
            html: `<p>By using this email (${email}) a business info has been registered successfully in ${process.env.DOMAIN}</p>`,
        });

        return NextResponse.json({
            message: "Business data created successfully",
            success: true,
            savedRent: savedBusiness,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
