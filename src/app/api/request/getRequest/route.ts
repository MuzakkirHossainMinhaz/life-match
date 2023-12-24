import { NextRequest, NextResponse } from "next/server";
import Request from "@/models/requestModel";

import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const request = await Request.find();
        
        return NextResponse.json({
            message: "found",
            data: request,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
