import { NextRequest, NextResponse } from "next/server";
import Vehicle from "@/models/vehicleSalesModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
    try {
        const vehiclesalesdata = await Vehicle.find({ isApproved: true });

        return NextResponse.json({
            message: "all vehicle sales data",
            data: vehiclesalesdata,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
