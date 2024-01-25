const nodemailer = require("nodemailer");

const sendVerifymail = async (name, email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      },
    });
    const mailOption = {
      from: process.env.Email,
      to: email,
      subject: "For OTP verification",
      html:
        "<p>hi" +
        name +
        ",please  enter the" +
        otp +
        " for your verification " +
        email +
        "</p>",
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("emai has been send to:", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { sendVerifymail };
