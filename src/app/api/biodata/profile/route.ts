import { NextRequest, NextResponse } from "next/server";
import Bio from "@/models/bioModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        const biodata = await Bio.find({ email: user.email });

        return NextResponse.json({
            message: "all biodata",
            data: biodata,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
