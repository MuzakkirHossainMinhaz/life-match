import { NextRequest, NextResponse } from "next/server";
import Sales from "@/models/salesModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
    try {
        const salesdata = await Sales.find({ isApproved: true });

        return NextResponse.json({
            message: "all sales data",
            data: salesdata,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
