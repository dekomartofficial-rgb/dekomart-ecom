const nodemailer = require('nodemailer');
const dataAcces = require("../database/dataaccess");
const mssql = require("mssql");


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

function sendMail(to, cc, bcc, subject, text) {
  const mailOptions = {
    from: MailAccount.user,
    to: to,
    cc: cc,
    bcc: bcc,
    subject: subject,
    html: text, // Use 'html' instead of 'text' for HTML templates
  };
  console.log(mailOptions)
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return 'ERROR';
    }
    return 'SUCESS';
  });
}

class Mail { 
  static GetEmailTemplate = async (ProductId, EmailId, Parm1, Parm2, Parm3, UserId) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_product_id", mssql.BigInt, ProductId);
      request.input("ai_email_temp_id", mssql.BigInt, EmailId);
      request.input("as_parm_1", mssql.VarChar(mssql.MAX), Parm1);
      request.input("as_parm_2", mssql.VarChar(mssql.MAX), Parm2);
      request.input("as_parm_3", mssql.VarChar(mssql.MAX), Parm3);
      request.input("ai_user_id", mssql.BigInt, UserId);
      const result = await request.execute("PKG_EMAIL$p_get_email_template");
      const res = result.recordset[0]; 
      sendMail(res.toList, res.ccList, res.bccList, res.subject, res.messageBody);

      return 'SUCCESS'
    } catch (e) {
      console.log(e)
      return 'ERROR'
    }
  }

}

module.exports = Mail
