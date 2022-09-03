const contacts = require("../../models/contacts")

// const {RequestError} = require("../../helpers");

// const { addSchema } = require("../../schemas/contacts");

const addContact = async (req, res) => {
    // try {
   
        // const { error } = addSchema.validate(req.body); // метод валидейт возврашает объект проверки
        // if (error) {
        //     throw RequestError(400, "missing required name field");
        // };
        // console.log(req.body);
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
    // } catch (error) {
    //     next(error)
    // }
};

module.exports = addContact;