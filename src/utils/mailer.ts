import User from "@/model/user.model";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';



export const sendMail = async ({
    email,
    emailType,
    userId,
}: any) => {
    try {
        //TODO: Configure mail for usage.

        const hashedVerifyToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "Verify") {
            await User.findByIdAndUpdate(userId, {
                $set : {verifyToken: hashedVerifyToken, verifyTokenExpiry: Date.now() + 3600000}
            })
        }
        else if (emailType === "Reset") {
            await User.findByIdAndUpdate(userId, {
                $set : {forgotPasswordToken: hashedVerifyToken, forgotPasswordTokenExpiry: Date.now() + 300000}
            })
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            }
        });



        const mailOptions = {
            from: 'rohitai@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "Verify" ? "Please verify your email." : "Here is your password reset number.", // Subject line
            html: emailType === "Verify" ? `
                <html>
                <head>
                    <title>Email Verification</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px; margin: auto;">
                        <tr>
                            <td style="background-color: #f8f8f8; padding: 40px 20px; text-align: center;">
                                <h1 style="color: #333;">Welcome to Our Website!</h1>
                                <p style="color: #666;">Please verify your email address to complete your registration.</p>
                                <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedVerifyToken}"style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Verify Email</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #007bff; padding: 20px; text-align: center;">
                                <p style="color: #fff; margin: 0;">Thank you for choosing us!</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            ` : `
                <html>
                <head>
                    <title>Password Reset</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px; margin: auto;">
                        <tr>
                        <td style="background-color: #f8f8f8; padding: 40px 20px; text-align: center;">
                        <h1 style="color: #333;">Password Reset</h1>
                        <p style="color: #666;">Here is your password reset number: <strong>123456</strong>.</p>
                        <p style="color: #666;">Please use this link to reset your password. If you didn't request a password reset, please ignore this email.</p>
                        <a href="${process.env.DOMAIN}/reset-password?token=${hashedVerifyToken}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Reset Password</a>
                    </td>
                        </tr>
                        <tr>
                            <td style="background-color: #007bff; padding: 20px; text-align: center;">
                                <p style="color: #fff; margin: 0;">Thank you for choosing us!</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            ` // html body
        };


        const mailRes = await transporter.sendMail(mailOptions);



    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}