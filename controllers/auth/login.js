const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env; 

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
         throw RequestError(401,"Email not found")
    }

    const passwordCompare = await bcrypt.compare(password, user.password);//сравнивает и проверяет password отправленный с фронтенда и с захишированный user.password  

    if (!passwordCompare) {
        throw RequestError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4d" });
    
    await User.findOneAndUpdate(user._id, {token})

    res.json({
        email: user.email,
        subscription: user.subscription,
        token,
    });
};

module.exports = login;