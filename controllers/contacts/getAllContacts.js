const {Contact} = require("../../models/contact");


const getAllContacts = async (_, res) => {
        const result = await Contact.find();//можно поискать по потребности Contact.find({},"name mail phone") || Contact.find({},"-createdAt -updatedAt")
        res.json(result);
};

module.exports = getAllContacts; 