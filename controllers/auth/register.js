const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
    const { name, password, email, subscription } = req.body;

    const user = await User.findOne({ email });
    
    if (user) {
       throw  RequestError(409, "Email already use")
    };
    const hashPassword = await bcrypt.hash(password, 10);//bcrypt.hash захиширование пороля 10 это сложности пороля
   const avatarUrl = gravatar.url(email);
    const result = await User.create({ name, password: hashPassword, email, subscription, avatarUrl });
    console.log(subscription);

    res.status(201).json({
        name: result.name,
        email: result.email,
        subscription: result.subscription,
        token:result.token,
    })
};

module.exports = register;