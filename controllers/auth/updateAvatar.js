const fs = require("fs/promises");

const path = require("path");

const { User } = require("../../models/user");
  

//"../../" путь к папке паблик аватарс это как ../../public || ../../public/avatars
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");


const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("avatars", filename);
    await User.findOneAndUpdate(_id, { avatarUrl });

    res.json({
        avatarUrl,
    })
};

module.exports = updateAvatar;