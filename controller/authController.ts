import { Request, Response } from "express";
import authModel from "../model/authModel";
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary"

export const regUsers = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        let image = name.charAt(0)
        let tokenString = crypto.randomBytes(10).toString("hex")

        const user = await authModel.create({
            name,
            email,
            password: hashedPassword,
            verified: false,
            token: tokenString,
            image: image
        })
        // const tokenID = jwt.sign({ userID: user?.id }, "SECERT", { expiresIn: "1m" })
        const tokenID = jwt.sign({ userID: user?.id }, "SECERT")

        res.status(201).json({
            message: "User created successfully",
            data: user,
            tokenID
        })

    } catch (error) {
        res.status(404).json({
            message: "Error creating a user",
            data: error
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const { token } = req.params

    const user = await authModel.findOne({ email })

    const sign: any = jwt.verify(token, "SECERT")

    if (user) {
        const checkPassword = await bcrypt.compare(password, user?.password)

        if (checkPassword) {
            res.status(201).json({
                message: `Welcome back ${user?.name}`,
                sign: sign?.userID
            })
        } else {
            res.status(404).json({
                message: "Password Incorrect",
            })
        }
    } else {
        res.status(404).json({
            message: "User Not Found",
        })
    }
}

export const updateUserImage = async (req: any, res: Response) => {
    try {
        const { userID } = req.params

        const user = await authModel.findById(userID)

        if (user) {
            const {secure_url} = await cloudinary.uploader.upload(req.file?.path)

            const updateImage = await authModel.findByIdAndUpdate(userID, { image: secure_url }, { new: true })

            res.status(201).json({
                message: "User Image updated successfully",
                data: updateImage
            })

        } else {
            res.status(404).json({
                message: "User Not Found",
            })
        }

    } catch (error) {
        res.status(404).json({
            message: "Error Updating User Image",
            data: error
        })
    }
}

export const viewUsers = async (req: Request, res: Response) => {
    try {
        const users = await authModel.find()

        res.status(200).json({
            message: "Users Found successfully",
            data: users
        })

    } catch (error) {
        res.status(404).json({
            message: "Error Finding User",
            data: error
        })
    }
}