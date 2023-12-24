import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Sales from "@/models/salesModel";
connect();

export async function GET(request: NextRequest) {
    try {
        const sales = await Sales.find({ isApproved: false });

        return NextResponse.json({
            message: "all sales data",
            data: sales,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
