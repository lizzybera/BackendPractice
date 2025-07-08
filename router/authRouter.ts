import { Router } from "express";
import { login, regUsers } from "../controller/authController";

const router = Router()

router.route('/reg').post(regUsers)
router.route('/login/:token').post(login)

export default router