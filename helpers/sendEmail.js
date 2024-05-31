import nodemailer from "nodemailer";
import "dotenv/config";

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "khanina_dasha@meta.ua",
        pass: META_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    to: "khanina_dasha@meta.ua",
    from: "khanina_dasha@meta.ua",
    subject: "Test email",
    html: `<h1 style="color: red">Test email</h1>`,
}

transport.sendMail(email)
    .then(() => console.log("email send succes"))
    .catch(error = console.log(error.message));