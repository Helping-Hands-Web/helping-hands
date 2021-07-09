const nodemailer = require('nodemailer');

const email = process.env.EMAIL_ACCOUNT;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.sendValidationEmail = (user) => {
  transporter
    .sendMail({
      from: `"Helping Hands" <${email}>`, 
      to: user.email, 
      subject: 'Welcome to Helping Hands! 🤝 ',
      html: `   
      <body style="background-color: #f3f3f3; padding:0; margin:0; border:none; border-spacing: 0px; border-collapse: collapse; vertical-align:top;">
      <table style="padding:0; margin:auto; padding-bottom:30px; border-spacing: 0px; border-collapse: collapse;" cellpadding="0" cellspacing="0" width="520">
          <tr style="background-color:#fff; padding:0;  border:none; border-spacing: 0px; border-collapse: collapse;" cellpadding="0" cellspacing="0">
          <td style="padding:0; margin:0; border:none; border-spacing: 0px; border-collapse: collapse; background-color:#fff; text-align:center">
                <img src="https://res.cloudinary.com/ironhack-helping-hands/image/upload/v1625845364/helping-hands/helping_hands_only_vjmpnv.png" style="margin-top: 40px; " alt="helping-hands-logo">          
                <h1 style="text-align:center; color: #ff914d; font-family: Roboto, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:600; font-size:28px; line-height: 29px; ">Welcome to Helping Hands!</h1>
                <p style="text-align:center; font-family: Roboto, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:400; font-size:18px; line-height: 29px; color: #595959; margin-left: 20px; margin-right:20px">We're excited to have you get started. First, you need to activate your account. Just press the button below</p>
                <a href="https://ironhack-helping-hands.herokuapp.com/users/${user.id}/activate" style="text-align:center; background-color:#ff914d; border-radius:5px; padding:15px; text-decoration:none; font-family: Roboto, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:400; font-size:18px; line-height: 29px;"> <span style="text-decoration:none; font-family: Roboto, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:400; font-size:18px; line-height: 28px; color:white;" >Activate your account</span>  </a>
          </td>
       </tr>
      </table>                
  </body>
              `,
    })
    .then(() => {
      console.log(`email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error('error sending mail', err);
    });
};