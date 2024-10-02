import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const MAIL_ID = process.env.MAIL_ID;

//email verification function
export const sendMail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const teamName = "random";
  const teamCode = "TEAM123";
  const mailOptions = {
    from: MAIL_ID,
    to,
    subject: `Team Code for Team: ${teamName} AR-Treasure Hunt`,
    text: `Save and Share to those who wants to join your team with this team code: ${teamCode} `,
  };

  await transporter.sendMail(mailOptions);
};

// sendMail("dulalhimesh@gmail.com","blablala"); debug use
