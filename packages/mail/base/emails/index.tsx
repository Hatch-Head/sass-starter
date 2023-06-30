import type ForgotPassword from "emails/ForgotPassword";
import type MagicLink from "./MagicLink";
import type NewUser from "./NewUser";

export const emails = {
  magicLink: (props: Parameters<typeof MagicLink>[0]) =>
    import("./MagicLink").then((m) => m.default(props)),
  forgotPassword: (props: Parameters<typeof ForgotPassword>[0]) =>
    import("./ForgotPassword").then((m) => m.default(props)),
  newUser: (props: Parameters<typeof NewUser>[0]) =>
    import("./NewUser").then((m) => m.default(props)),
  newsletterSignup: () => import("./NewsletterSignup").then((m) => m.default()),
};