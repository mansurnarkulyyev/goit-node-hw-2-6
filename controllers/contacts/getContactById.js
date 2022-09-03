const contacts = require("../../models/contacts")

const RequestError = require("../../helpers/RequestError");

const getContactById = async (req, res) => {
    // try {
        // console.log(req.params);
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            throw RequestError(404, "Not found!");
            // ****
            // const error = new Error("Not found");
            // error.status = 404;
            // throw error;
            // ****
            // return res.status(404).json({
            //   "message": "Not found",
            // })
        }
        res.json(result);
    // } catch (error) {
        // const { status = 500, message = "Server error!" } = error;
        // res.status(status).json({
        //   message,
        // })
    
        // next(error); 

    // }
};

module.exports = getContactById;