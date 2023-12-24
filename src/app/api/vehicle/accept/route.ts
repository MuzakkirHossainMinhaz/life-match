import { connect } from "@/dbConfig/dbConfig";
import VehicleSales from "@/models/vehicleSalesModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        const data = await VehicleSales.findOne({ _id: id });

        if (!data) {
            return NextResponse.json({ error: "Not found" }, { status: 400 });
        }

        data.isApproved = true;
        await data.save();

        return NextResponse.json({
            message: "Accepted",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
