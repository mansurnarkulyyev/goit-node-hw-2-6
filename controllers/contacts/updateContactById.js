const contacts = require("../../models/contacts")

const {RequestError} = require("../../helpers");

// const { addSchema } = require("../../schemas/contacts");

const updateContactById = async (req, res) => {
    // try {
        // const { error } = addSchema.validate(req.body);
        // if (error) {
        //     throw RequestError(400, "missing fields");
        // };
        const { contactId } = req.params;
        const result = await contacts.updateContactById(contactId, req.body);
        if (!result) {
            throw RequestError(404, "Not found!");
        };
        res.json(result);
    // } catch (error) {
    //     next(error);
    // }
};

module.exports = updateContactById;