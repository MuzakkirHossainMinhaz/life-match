import { connect } from "@/dbConfig/dbConfig";
import Sales from "@/models/salesModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        const data = await Sales.findOneAndDelete({ _id: id });

        if (!data) {
            return NextResponse.json({ error: "Not found" }, { status: 400 });
        }

        return NextResponse.json({
            message: "Deleted",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
