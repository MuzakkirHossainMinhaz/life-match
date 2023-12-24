import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import VehicleSales from "@/models/vehicleSalesModel";
connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        const vehicleSales = await VehicleSales.find({ email: user.email });

        return NextResponse.json({
            message: "all vehicleSales data",
            data: vehicleSales,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
