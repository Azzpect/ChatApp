import nodemailer from "nodemailer";
import { logger } from "../logger.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const mailOptions = {
      from: "ChatApp",
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info("Email sent: " + info.response);
  } catch (err) {
    throw new Error((err as Error).message);
  }
}
