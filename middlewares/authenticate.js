const jwt = require("jsonwebtoken");

const {User} = require("../models/user")

const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
try {
     const { authorization = "" } = req.headers;

    const [bearer, token] = authorization.split(" ");//делим токен на два части 

    if (bearer !== "Bearer") {
        throw RequestError(401, "Not authorized");
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw RequestError(401, "Not authorized");
            // next(RequestError(401, "Not authorized"));
        }
        req.user = user;
        next();
    } catch (error) {
        throw RequestError(401, "Not authorized");
            // next(RequestError(401, "Not authorized"));
    }

} catch (error) {
    next(error)
    };
};

module.exports = authenticate;