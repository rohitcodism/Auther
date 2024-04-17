import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/db/dbConfig";
import { extractTokenData } from "@/utils/extractTokenData";


// connecting to db
connectDb();


export async function GET(req: NextRequest){

    const userId = await extractTokenData(req);

    const user = await User.findById(userId).select("-password");

    // check if there is no user
    if(!user){
        NextResponse.json({message: "User not found!!!"},{status: 404});
    }

    return NextResponse.json({User: user, success: true},{status: 200});
}