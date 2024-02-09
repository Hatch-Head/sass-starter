import { send as local } from "./local";
import { send as production } from "./resend";

export const send = process.env.NODE_ENV === "production" ? production : local;
