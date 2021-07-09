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
                <h1>Welcome to Iron Foodie</h1>
                <p>Activate your account</p>
                <a href="https://ironhack-helping-hands.herokuapp.com/users/${user.id}/activate">Click here</a>
              `,
    })
    .then(() => {
      console.log(`email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error('error sending mail', err);
    });
};