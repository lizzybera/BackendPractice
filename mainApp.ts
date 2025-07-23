import express, { Application, Request, Response } from "express";
import practice from "./router/practiceRouter"
import authRouter from "./router/authRouter"
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";

export const mainApp = (app: Application) => {
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.set("view engine", "ejs")
    app.set("views", "./views")

    app.use("/prac", practice)
    app.use("/user", authRouter)

    app.get("/", (req: Request, res: Response) => {
        try {
            res.render("logView", {title : "home", items: ["banana", "apple"]})
        } catch (error) {
            res.send(error)
        }
    })
}