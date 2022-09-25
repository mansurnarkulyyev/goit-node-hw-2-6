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
},{versionKey:false, timestamps:true});

userSchema.post("save", handleMongooseSchemaError);

const registerSchema = Joi.object({  //пишем проверку как проптайпс в реакте
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
  token: Joi.string().required(),
});

const loginSchema = Joi.object({  
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemas = {
    registerSchema,
    loginSchema ,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};