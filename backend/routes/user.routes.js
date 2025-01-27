import express from "express";
import { login, logout, register, updateProfile } from "../Controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthanticated.js";
import { singleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile);

export default router;
