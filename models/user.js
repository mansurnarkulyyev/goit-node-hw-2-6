const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseSchemaError } = require("../helpers");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarUrl: {
        type: String,
        required:true,
    },
    verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {// отправка письмо на эмейл
    type: String,
    required: [true, 'Verify token is required'],
  },
},{versionKey:false, timestamps:true});

userSchema.post("save", handleMongooseSchemaError);

const registerSchema = Joi.object({  //пишем проверку как проптайпс в реакте
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().required(),
});

const loginSchema = Joi.object({  
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
    email:Joi.string().required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};



