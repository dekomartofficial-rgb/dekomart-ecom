const nodemailer = require('nodemailer');

const MailAccount = {
  user: 'sinanruzz9@gmail.com',
  pass: 'ljxo qukt veez kxvt'
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MailAccount.user,        // your Gmail
    pass: MailAccount.pass,           // use App Password, not Gmail password
  },
});

class Mail {
  static SendMail = (to, subject, text) => {
    // Email options
    const mailOptions = {
      from: MailAccount.user,
      to: to,
      subject: subject,
      text: text,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return 'ERROR';
      }
      return 'SUCESS';
    });
  }
}

module.exports = Mail
