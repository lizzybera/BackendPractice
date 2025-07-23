import { Router } from "express";
import { login, regUsers, updateUserImage, viewUsers } from "../controller/authController";
import { upload } from "../config/multer";

const router = Router()

router.route('/reg').post(regUsers)
router.route('/login/:token').post(login)
router.route('/update/:userID').patch(upload, updateUserImage)
router.route('/').get(viewUsers)

export default router