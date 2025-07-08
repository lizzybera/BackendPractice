import { Request, Response } from "express";
import authModel from "../model/authModel";
import bcrypt from "bcrypt"
import crypto from "crypto"
import practiceModel from "../model/practiceModel";

const createAuth = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        let image = name.charAt(0)

        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)

        let token = crypto.randomBytes(10).toString('hex')

        const user = await authModel.create({
            name,
            email,
            password: hash,
            image: image,
            verified: false,
            token
        })

        res.status(201).json({
            message: "User created successfully",
            data: user
        })

    } catch (error) {
        res.status(404).json({
            message: "Error while creating User"
        })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        let user = await authModel.findOne({ email })

        if (user) {
            const check = await bcrypt.compare(password, user?.password)

            if (check) {
                res.status(201).json({
                    message: `Welcome to our bookstore ${user?.name}`
                })
            } else {
                res.status(404).json({
                    message: "No User Found"
                })
            }
        } else {
            res.status(404).json({
                message: "No User Found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: "Error while logging User"
        })
    }
}

const userPractices = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const userPractices = await authModel.findById(userId).populate({
            path: "practice",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        })
    } catch (error) {
        res.status(404).json({
            message: "Error While getting user parctices",
            data: error
        })
    }
}

const createUserPractices = async (req: Request, res: Response) => {
    try {
        const { userId, productid } = req.params

        const user = await authModel.findById(userId)

        if(user){
            const product : any = await practiceModel.findById(productid)

            if(product){
                user?.practice.push(product._id)
                user?.save()

                res.status(201).json({
            message: "User practice created successfully",
            data: user
        })
            }else{
                res.status(404).json({
            message: "No Practice found"
        })
            }
        }else {
            res.status(404).json({
            message: "No User Found",
        })
        }
        
    } catch (error) {
        res.status(404).json({
            message: "Error While creating user practices",
            data: error
        })
    }
}
