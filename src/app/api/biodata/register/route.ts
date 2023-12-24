import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Bio from "@/models/bioModel";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        if (reqBody.brothers === 0) {
            reqBody.brothers = -1;
        }
        if (reqBody.sisters === 0) {
            reqBody.sisters = -1;
        }

        const {
            full_name,
            gender,
            date_of_birth,
            blood_group,
            father_name,
            mother_name,
            father_occupation,
            mother_occupation,
            brothers,
            sisters,
            education,
            marital_status,
            occupation,
            religion,
            height,
            weight,
            photo,
            guardian,
            email,
            phone,
            street,
            city,
            state,
            postal_code,
            social_media,
            country,
            message,
            flag,
            skin_color,
        } = reqBody;

        if (
            !full_name ||
            !gender ||
            !date_of_birth ||
            !blood_group ||
            !father_name ||
            !mother_name ||
            !father_occupation ||
            !mother_occupation ||
            !education ||
            !marital_status ||
            !occupation ||
            !religion ||
            !height ||
            !weight ||
            !photo ||
            !guardian ||
            !email ||
            !phone ||
            !street ||
            !state ||
            !postal_code ||
            !country ||
            !skin_color ||
            !flag
        ) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const newBio = new Bio({
            full_name,
            gender,
            date_of_birth,
            blood_group,
            father_name,
            mother_name,
            father_occupation,
            mother_occupation,
            brothers,
            sisters,
            education,
            marital_status,
            occupation,
            religion,
            height,
            weight,
            photo,
            guardian,
            email,
            phone,
            street,
            city,
            state,
            postal_code,
            social_media,
            country,
            message,
            flag,
            skin_color,
        });

        const savedBio = await newBio.save();

        //send email
        await sendEmail({
            email,
            emailType: "",
            id: savedBio._id,
            subject: "Biodata for Marriage created!",
            html: `<p>By using this email (${email}) a biodata has been created successfully in ${process.env.DOMAIN}</p>`,
        });

        return NextResponse.json({
            message: "Biodata created successfully",
            success: true,
            savedBio,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
