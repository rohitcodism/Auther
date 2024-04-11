import { connectDb } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// SET connection with the database
connectDb()

export async function POST(req: NextRequest){
    try {

        const token = req.cookies.get("token");

        const res = NextResponse.json({
            message : "Logged out successfully",
            success : true,
        })

        if(token){
            res.cookies.set("token","",{ httpOnly : true, expires : new Date(0)});

            return res;
        }
        return NextResponse.json({message : "User is already logged out"},{status : 200});

    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },{status : 500})
    }
}