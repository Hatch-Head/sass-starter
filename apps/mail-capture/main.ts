
import MailDev from "maildev";

const maildev = new MailDev({
    web: 3010,
    smtp: 1025
});

maildev.listen();

maildev.on("new", function (email: any) {
    // We got a new email!
    console.log("NEW MAIL", email.to[0].address);
});