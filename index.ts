import express, { Application, Request, Response } from "express"
import database from "./config/database"
import practice from "./router/practiceRouter"
import authRouter from "./router/authRouter"
import dotenv from "dotenv"

dotenv.config()

const port : number = parseInt(process.env.PORT!)


const app: Application = express()
database()
app.use(express.json())
app.use("/prac", practice)
app.use("/user", authRouter)

app.get("/", (req: Request, res : Response) => {
    try {
        res.send("Welcome to my channel")
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, ()=>{
    console.log(`Server is live at ${port}`);  
})