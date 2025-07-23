import express, { Application, Request, Response } from "express"
import database from "./config/database"
import dotenv from "dotenv"
import { mainApp } from "./mainApp"

dotenv.config()

const port : number = parseInt(process.env.PORT!)


const app: Application = express()
mainApp(app)


const server = app.listen(port, ()=>{
    database()
    console.log(`Server is live at ${port}`);  
})

process.on("uncaughtException", (error : any) => {
    console.log(error);

    process.exit(1)
})

process.on("unhandledRejection", (error : any) => {
    console.log(error);

    server.close(()=>{
        process.exit(1)
    })
})