import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Bio from "@/models/bioModel";
import Request from "@/models/requestModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, sender, rid } = reqBody;

        const data = await Bio.find();

        let bio;
        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            if (element._id.toString().includes(id)) {
                bio = element;
                break;
            }
        }

        if (!data) {
            return NextResponse.json({ error: "Not found" }, { status: 400 });
        }

        bio.sharedWith.push(sender);

        await bio.save();

        const del = await Request.findOneAndDelete({ _id: rid });

        return NextResponse.json({
            message: "Accepted",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
