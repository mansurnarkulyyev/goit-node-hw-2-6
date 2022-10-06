const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { RequestError, sendMail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
    const { name, password, email, subscription } = req.body;

    const user = await User.findOne({ email });
    
    if (user) {
       throw  RequestError(409, "Email already use")
    };
    const hashPassword = await bcrypt.hash(password, 10);//bcrypt.hash захиширование пороля 10 это сложности пороля
    const avatarUrl = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ name, password: hashPassword, email, subscription, avatarUrl, verificationToken });
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a href='${BASE_URL}/api/auth/verify/${verificationToken}' target="_blank">Нажмите для подтверждения регистрации</a>`
    };
    await sendMail(mail);

    res.status(201).json({
        name: result.name,
        email: result.email,
        subscription: result.subscription,
        token: result.token,
        verificationToken:result.verificationToken,
    })
};

module.exports = register;