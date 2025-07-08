import { Router } from "express";
import { addPractice, createPractice, getPractice, viewUserPractices } from "../controller/practiceController";

const router = Router()

// router.get('/practices', getPractice);
router.route("/practice").post(createPractice)
router.route("/").get(getPractice)
router.route("/getPrac/:userId/:practiceid").get(addPractice)
router.route("/getuserprac/:userid").get(viewUserPractices)

export default router