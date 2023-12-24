import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Rent from "@/models/rentModel";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            area,
            land_type,
            advance_pay,
            monthly_rent,
            room,
            bathroom,
            kitchen,
            balcony,
            photo,
            email,
            phone,
            street,
            city,
            state,
            postal_code,
            country,
            message,
            house_name,
            flag,
        } = reqBody;

        if (
            !area ||
            !land_type ||
            !advance_pay ||
            !monthly_rent ||
            !room ||
            !bathroom ||
            !kitchen ||
            !balcony ||
            !photo ||
            !email ||
            !phone ||
            !street ||
            !state ||
            !postal_code ||
            !country ||
            !house_name ||
            !flag
        ) {
            console.log("dlkfjsdklfhsdkjflksadjf");

            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const newRent = new Rent({
            area,
            land_type,
            advance_pay,
            monthly_rent,
            room,
            bathroom,
            kitchen,
            balcony,
            photo,
            email,
            phone,
            street,
            city,
            state,
            postal_code,
            country,
            message,
            house_name,
            flag,
        });

        const savedRent = await newRent.save();

        //send email
        await sendEmail({
            email,
            emailType: "",
            id: savedRent._id,
            subject: "Rent data registered!",
            html: `<p>By using this email (${email}) a rent info has been registered successfully in ${process.env.DOMAIN}</p>`,
        });

        return NextResponse.json({
            message: "Rentdata created successfully",
            success: true,
            savedRent,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
