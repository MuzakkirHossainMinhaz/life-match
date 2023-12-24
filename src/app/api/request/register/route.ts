import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Request from "@/models/requestModel";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { sender, reciever, for_bio, sender_bio } = reqBody;

        const newRequest = new Request({
            reciever,
            sender,
            for_bio,
            sender_bio,
        });

        const savedRequest = await newRequest.save();

        //send verification email
        await sendEmail({
            email: reciever,
            emailType: "",
            id: savedRequest._id,
            subject: "You have a biodata request",
            html: `<p>By this email (${sender}), sent a request for your biodata contact information.</p>`,
        });

        return NextResponse.json({
            message: "Request send successfully",
            success: true,
            savedRequest,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
