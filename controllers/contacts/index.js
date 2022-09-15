const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");
const removeContact = require("./removeContact");

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updateContactById,
    updateFavorite,
    removeContact,
};