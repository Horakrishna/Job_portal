const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler( async (data, req, res) =>{

    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAII_ID,
            pass: process.env.MAII_PASS,
        },
    });

    let info = await transporter.sendMail({
        from:"Hora krishna roy",
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
    });
    console.log("Message Send:", info.messageId );
    console.log("Preview Url:",  nodemailer.getTestMessageUrl(info));
});

module.exports = sendEmail;
