import { NextRequest, NextResponse } from "next/server";
import Business from "@/models/businessModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
    try {
        const businessdata = await Business.find({ isApproved: true });

        return NextResponse.json({
            message: "all business data",
            data: businessdata,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
