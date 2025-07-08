import { Request, Response } from "express"
import model from "../model/practiceModel"
import authModel from "../model/authModel"

export const createPractice = async (req: Request, res: Response) => {
    try {
        const { name, task, image } = req.body

        const practiced = await model.create({ name, task, image })

        res.status(201).json({
            message: "message created successfully",
            data: practiced
        })
    } catch (error) {
        res.status(404).json({
            data: error
        })
    }
}

export const getPractice = async (req: Request<any>, res: Response<any>) => {
    try {
        const practices = await model.find()

        res.status(200).json({
            message: "users found",
            data: practices
        })
    } catch (error) {
        res.status(404).json({
            data: error
        })
    }
}

export const addPractice = async (req: Request, res: Response) => {
    try {
        const { userId, practiceid } = req.params

        const practice: any = await model.findById(practiceid)

        if (practice) {
            const user = await authModel.findById(userId)
            user?.practice.push(practice?._id)
            user?.save()
            res.status(200).json({ message: user })
        } else {
            res.status(404).json({ message: "error" })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const viewUserPractices = async (req: Request, res: Response) => {
    try {
        const { userid } = req.params

        const practice = await authModel.findById(userid).populate({
            path: "practice",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        })

        res.status(200).json({
            message: "User Practices found successfully",
            data: practice
        })

    } catch (error) {
        res.status(404).json({
            message: "Error Finding practices",
            data: error
        })
    }
}