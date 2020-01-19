const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "noreply@node-react.com" };

exports.sendEmail = emailData => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "nayeemahmedru@gmail.com",
      pass: "yzokalrqvysqyrbj"
    }
  });
  return (
    transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`))
  );
};