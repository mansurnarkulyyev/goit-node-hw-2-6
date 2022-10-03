const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname,"../", "temp");

const multerConfig = multer.diskStorage({ //diskStorage метод multera
  destination: tempDir,   //"./temp"
  filename: (req, file, cb) => { //cb это как next
    cb(null, file.originalname)
    }
});

const uploadAvatar = multer({
  storage: multerConfig
});
// upload.fields([{name:"cover", maxCount: 8}, {name:"pdf",maxCount:2}])  если у нас несколько полей с несколькими файлами
// upload.array("cover", 8)//если мы ожидаем несколько файлов в одном поле. 8 это максимальное количество

module.exports = uploadAvatar; 