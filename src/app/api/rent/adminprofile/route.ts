import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Rent from "@/models/rentModel";
connect();

export async function GET(request: NextRequest) {
    try {
        const rentdata = await Rent.find({ isApproved: false });

        return NextResponse.json({
            message: "all rent data",
            data: rentdata,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
