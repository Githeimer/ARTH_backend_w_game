import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const MAIL_ID=process.env.MAIL_ID;

//this function generates JWT
export const generateJWTtoken= (email)=>{
    return jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'});
};

//email verification function
export const sendMail=async(to,token)=>{
    const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: MAIL_ID,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    const link="www.youtube.com"; //test link
    // const link ="https://gameurl.com/verify?token=${token}"; //format for link


    const mailOptions={
        from: MAIL_ID,
        to,
        subject:"Email Verification for AR Treasure Hunt v3 Registration",
        text:"Please verify your email by clicking the following link: "+link,
    };

    await transporter.sendMail(mailOptions);
}

// sendMail("dulalhimesh@gmail.com","blablala"); debug use