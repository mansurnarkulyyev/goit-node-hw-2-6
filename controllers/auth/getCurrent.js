const getCurrent = async(req, res) => {
           const {name, email,subscription} = req.user;
    console.log(req.user);
    res.json({
        name,
        email,
        subscription
    })
}

module.exports = getCurrent;