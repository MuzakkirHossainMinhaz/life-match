import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { fullname, email, password } = reqBody;

        //check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        //send verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            id: savedUser._id,
        });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
