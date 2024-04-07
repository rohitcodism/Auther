import nodemailer from "nodemailer";



export const sendMail = async ({
    email,
    emailType,
    userId,
}: any) => {
    try {
        //TODO: Configure mail for usage.

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });



        const mailOptions = {
            from: 'rohitai@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "Verify" ? "Please verify your email." : "Here is your password reset number.", // Subject line
            html: "<b>Hello world?</b>", // html body
        }

        const mailRes = await transporter.sendMail(mailOptions);



    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}