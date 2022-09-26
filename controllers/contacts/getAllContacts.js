const {Contact} = require("../../models/contact");


const getAllContacts = async (req, res) => {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({ owner }, { skip, limit })//skip это сколько пропустить//можно поискать по потребности Contact.find({},"name mail phone") || Contact.find({},"-createdAt -updatedAt")
                .populate("owner", "name email phone favorite");//означет распространить свойства овнер //этот способ вместо айди получить реальные и полное инфо польз.. вторым аргументом передаем те инфо- котор- мы хотим получить
        res.json(result);
};

module.exports = getAllContacts; 