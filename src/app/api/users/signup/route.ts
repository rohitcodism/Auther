import { connectDb } from "@/db/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendMail } from "@/utils/mailer";

connectDb();

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();
        const {username, email, password} = await reqBody //* Request body can be a promise that is why typescript uses await for safety */
        
        //validation
        console.log(reqBody);

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json(
                {
                    error: "User already exists."
                },
                {
                    status: 400,
                }
            )
        }

        const salt = await  bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();

        console.log("Saved User : ",savedUser);

        //* Send verification email
        await sendMail({
            email: email,
            emailType: "Verify",
            userId: savedUser._id,
        })

        return NextResponse.json({
            email: email,
            message: "User registered successfully.",
            success: true,
            status: 200,
        })

    } catch (error: any) {
        console.log(error);

        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}