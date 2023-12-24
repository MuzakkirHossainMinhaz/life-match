import { NextRequest, NextResponse } from "next/server";
import Rent from "@/models/rentModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
    try {
        const rentdata = await Rent.find({ isApproved: true });

        return NextResponse.json({
            message: "all rent data",
            data: rentdata,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
