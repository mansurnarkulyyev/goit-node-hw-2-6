const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, uploadAvatar } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

//signup
router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

//signin
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout)); 

router.patch("/avatars", authenticate, uploadAvatar.single("avatar"), ctrlWrapper(ctrl.updateAvatar));//обновления аватарки пользователья

module.exports = router;