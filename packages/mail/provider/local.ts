import nodemailer from "nodemailer";
import { config } from "../config";
import { SendEmailHandler } from "../types";

const { from } = config;


export const send: SendEmailHandler = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "0.0.0.0",
    port: 1025,
    secure: false
  });

  await transporter.sendMail({
    to,
    from,
    subject,
    text,
    html,
  });
};
