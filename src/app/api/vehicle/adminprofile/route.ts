import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import VehicleSales from "@/models/vehicleSalesModel";
connect();

export async function GET(request: NextRequest) {
    try {
        const vehicle = await VehicleSales.find({ isApproved: false });

        return NextResponse.json({
            message: "all vehicle",
            data: vehicle,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
