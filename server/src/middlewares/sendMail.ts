import nodemailer from 'nodemailer';
import { logger } from '../logger';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'chatapp866@gmail.com',
        pass: 'vxbi ricd pypk hgki '
    }
})

export async function sendEmail(to: string, subject: string, html: string) {
    try {
        const mailOptions = {
            from: "ChatApp",
            to: to,
            subject: subject,
            html: html
        }
    
        const info = await transporter.sendMail(mailOptions)
        logger.info("Email sent: " + info.response)
    }
    catch (err) {
        throw new Error((err as Error).message)
    }
}