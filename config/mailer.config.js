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
                <table style="padding:0; margin:0 border:none; border-spacing: 0px; border-collapse: collapse;" cellpadding="0" cellspacing="0" width="520">
                    <tr style="background-color:#fff; padding:0;  border:none; border-spacing: 0px; border-collapse: collapse;" cellpadding="0" cellspacing="0">
                    <td style="padding:0; margin:0; border:none; border-spacing: 0px; border-collapse: collapse; background-color:#fff; width:320px ">
                        <img src="https://res.cloudinary.com/ironhack-helping-hands/image/upload/v1625845364/helping-hands/helping_hands_name_grdqxf.png" alt="helping-hands-logo">          
                        <h1 style="color: #ff914d">Welcome to Helping Hands!</h1>
                        <p style="color: #595959">We're excited to have you get started. First, you need to activate your account. Just press the button below</p>
                        <button type="button" style="display: block; background-color: #ff914d; border-radius: 7px; border: 0px; padding-top: 14px; padding-bottom: 14px; padding-left:30%; padding-right:30%;">
                            <a href="https://ironhack-helping-hands.herokuapp.com/users/${user.id}/activate" style="text-decoration:none;"> <span style="text-decoration:none; font-family: Roboto, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-weight:400; font-size:18px; line-height: 28px; color:white;">Activate your account</span>  </a>
                        </button>
                    </td>
                 </tr>
                </table>                
              `,
    })
    .then(() => {
      console.log(`email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error('error sending mail', err);
    });
};