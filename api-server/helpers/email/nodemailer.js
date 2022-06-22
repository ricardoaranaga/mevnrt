// Load .env config
require('dotenv').config();

const nodemailer = require("nodemailer");

exports.sendEmail = async ( document, email ) => {
  console.log()
  const transporter = await nodemailer.createTransport({
    secure: false,
    service: "gmail",
    auth: { user: process.env.NODEMAILER_SUPPORT_EMAIL, pass: process.env.NODEMAILER_SUPPORT_EMAIL_PWD },
    tls: {
      rejectUnauthorized: false
    }
  });
  try {
    await transporter.verify();
  } catch (error) {
    console.log("Error nodemailer.js:", error);
    throw error;
  }

  try {
    const mailOptions = {
        from: `Support <${process.env.NODEMAILER_SUPPORT_EMAIL}>`,
        to: email,
        subject: "Test",//document.title
        html: "<b>Welcome?</b>"
    };
    return transporter.sendMail(mailOptions);
      
  } catch (error) {
    console.error("got an error", error);
  }
};

exports.sendVerificationEmail = async ( email, link ) => {
  const transporter = await nodemailer.createTransport({
    secure: false,
    service: "gmail",
    auth: { user: process.env.NODEMAILER_SUPPORT_EMAIL, pass: process.env.NODEMAILER_SUPPORT_EMAIL_PWD },
    tls: {
      rejectUnauthorized: false
    }
  });
  try {
    await transporter.verify();
  } catch (error) {
    console.log("Error nodemailer.js:", error);
    throw error;
  }
  try{
  //const htmlVerificationEmail = utils.verificationEmailTemplate(link);
  const mailOptions = {
    from: `Support <${process.env.NODEMAILER_SUPPORT_EMAIL}>`,
    to: email,
    subject: "Test",//document.title
    html: "<b>Verification Email?</b>"//html: htmlVerificationEmail
  };
  return transporter.sendMail(mailOptions);
 
  } catch (error) {
    console.error("got an error", error);
  }
};