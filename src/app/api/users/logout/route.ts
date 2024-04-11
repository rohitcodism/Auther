import { connectDb } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// SET connection with the database
connectDb()

export async function POST(req: NextRequest){
    try {
        const res = NextResponse.json({
            message : "Logged out successfully",
            success : true,
        })

        res.cookies.set("token","",{ httpOnly : true, expires : new Date(0)});

        return res;

    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },{status : 500})
    }
}