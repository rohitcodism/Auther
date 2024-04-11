import { connectDb } from "@/db/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

// SET connection with the database
connectDb()


export async function POST(req : NextRequest){
    try {
        
        const reqBody = await req.json();

        const { username, email, password } = await reqBody;

        if((username && email) && password){
            return NextResponse.json({message : "You have to fill all the fields"},{status : 500});
        }

        let user;

        if(!email){
            user = await User.findOne({username : username});
        }else{
            user = await User.findOne({email : email});
        }

        if(!user){
            return NextResponse.json({error : "User not found!!"},{status : 404});
        }

        console.log("User exists : ",user);
        
        const isValidPassword = await bcryptjs.compare(password, user.password);

        if(!isValidPassword){
            return NextResponse.json({message : "Check your credentials!!"},{status : 400});
        }

        const tokenPayload = {
            id : user._id,
            username : user.username,
            email : user.email,
            password : user.password,
        }

        const token = jwt.sign(tokenPayload,process.env.TOKEN_SECRET!,{ expiresIn : '1d' });

        const res =  NextResponse.json({
            message : "Logged in successfully",
            success : true,
        },{
            status : 200
        },)

        // only can be manipulated inside server
        res.cookies.set("token",token,{
            httpOnly : true,
        })


    } catch (error) {
        
    }
}