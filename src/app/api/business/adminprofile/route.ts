import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Business from "@/models/businessModel";
connect();

export async function GET(request: NextRequest) {
    try {
        const products = await Business.find({ isApproved: false });

        return NextResponse.json({
            message: "all products",
            data: products,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
