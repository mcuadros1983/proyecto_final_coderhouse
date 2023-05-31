import { createTransport } from "nodemailer"; 

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMailTo = async (to, subject, text) => {
  console.log("datos", to, subject, text, process.env.NODEMAILER_FROM, process.env.NODEMAILER_USER, process.env.NODEMAILER_PASS)
  const mailOptions = {
    from: process.env.NODEMAILER_FROM || "Store",
    to,
    subject,
    text,
  };
  return await transporter.sendMail(mailOptions);
};

export default sendMailTo;
