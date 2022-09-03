
const Joi = require("joi");  //пакет проверяет тело запроса по схеме (как проптайпс в реакте)


const addSchema = Joi.object({  //пишем проверку как проптайпс в реакте
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
    addSchema,
}; 