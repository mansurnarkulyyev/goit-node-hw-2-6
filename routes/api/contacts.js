const express = require('express');

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");
const {addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllContacts)); 

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/',validateBody(addSchema), ctrlWrapper(ctrl.addContact));

router.put('/:contactId',validateBody(addSchema),ctrlWrapper(ctrl.updateContactById));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));


module.exports = router
