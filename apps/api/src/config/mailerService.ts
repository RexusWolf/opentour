import { createTransport } from 'nodemailer';

export const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_USER, // generated ethereal user
    pass: process.env.MAILER_PASSWORD, // generated ethereal password
  },
});
