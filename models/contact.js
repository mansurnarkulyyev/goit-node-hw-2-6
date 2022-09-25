const { Schema, model } = require("mongoose");
const Joi = require("joi"); 
const { handleMongooseSchemaError } = require("../helpers");

const contactSchema = new Schema(//Схема
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
     owner: {
       type: Schema.Types.ObjectId,
       ref: 'user',
       required:true,
    }
  },
  { versionKey: false, timestamps: true }//время создание и обновление создать ...
);
  
// с помощю схемы создаем модель,(c больщими буквами) первым аргументом нужно указать назв единственном числе а вторым само схему как ниже указан...
// contacts => contact
// categories => category
// mice => mouse

contactSchema.post("save", handleMongooseSchemaError);

const addSchema = Joi.object({  //пишем проверку как проптайпс в реакте
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};