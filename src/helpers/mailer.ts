import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(),10);
        
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000})
        }
        
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
                user: "2f94a4adeb7f9b",
                pass: "97c770d95ff1c4"
            }
        });

        const mailOptions = {
            from: 'aman@gmail.com',
            to: email,
            subject: emailType === "VERIFY"?"Verify your email":"Reset your password",
            html :`<p>Click <a href=""> here</a> to ${emailType === "VERIFY"?"verify your email":"reset your password"} or copy and paste the link below in yor browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    }
    catch(error: any){
        throw new Error(error.message);
    }
}
