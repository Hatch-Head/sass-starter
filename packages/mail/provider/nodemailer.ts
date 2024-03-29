import nodemailer from "nodemailer";
import { config } from "../config";
import { SendEmailHandler } from "../types";

const { from } = config;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const send: SendEmailHandler = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "0.0.0.0",
    port: 1025,
    secure: false
    // auth: {
    //   user: process.env.MAIL_USER as string,
    //   pass: process.env.MAIL_PASS as string,
    // },
  });

  await transporter.sendMail({
    to,
    from,
    subject,
    text,
    html,
  });
};
