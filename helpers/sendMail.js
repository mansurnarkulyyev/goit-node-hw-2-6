const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_API_KEY } = process.env;
const { USER_EMAIL } = process.env;

sgMail.setApiKey(SEND_GRID_API_KEY);


const sendMail = async (data)=>{
    const mail = { ...data, from: USER_EMAIL };
    await sgMail(mail);
    return true;
}

module.exports = sendMail;