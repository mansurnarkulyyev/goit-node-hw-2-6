const contacts = require("../../models/contacts");

// const getAllContacts = async (req, res, next) => {//что бы линтер не ругался req можно писать нижн почерк... 
const getAllContacts = async (_, res) => {
    // try {
        const result = await contacts.listContacts();
        res.json(result);
    // } catch (error) {
        // res.status(500).json({
        //   message: "Server error!"
        // })
        // next(error);
    // }
};

module.exports = getAllContacts; 