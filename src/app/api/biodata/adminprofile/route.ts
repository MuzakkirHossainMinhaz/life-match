import { NextRequest, NextResponse } from "next/server";
import Bio from "@/models/bioModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
    try {
        const biodata = await Bio.find({ isApproved: false });

        return NextResponse.json({
            message: "all biodata",
            data: biodata,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
