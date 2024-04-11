import { connectDb } from "@/db/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

// DB connection initialized
connectDb()

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();

        const {token} = await reqBody;

        // checking the token
        console.log(token);

        if(!token){
            return NextResponse.json({error: "Token not provided!!!"},{status:400});
        }

        const user = await User.findOne({verifyToken : token, verifyTokenExpiry : {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({error : "Invalid Token!!!"}, {status : 400});
        }

        //checking user
        console.log(user);

        user.isVerified = true;
        user.verifyTokenExpiry = undefined;
        user.verifyToken = undefined;

        try {
            
            await user.save();

            return NextResponse.json({message : "Email verified successfully", success : true},{status : 200});

        } catch (error : any) {
            return NextResponse.json({error : error.message},{status : 400});
        }

    } catch (error : any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status:400});
    }
}