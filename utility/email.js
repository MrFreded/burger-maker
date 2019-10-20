const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1. create transporter
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.TRANSPORT_SENDGRID_USERNAME,
      pass: process.env.TRANSPORT_SENDGRID_PASSWORD
    }
  });

  // 2. define the email options
  const mailOptions = {
    from: 'Fredrick Okoro <fredrickmonretex@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3.  send email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
