import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

// const practicedb = "mongodb://localhost:27017/practiceDB"
const practicedb = process.env.URL!

const database = async() =>{
    try {
        const databaseConnect = await mongoose.connect(practicedb)

        console.log(`database is connect at ${databaseConnect.connection.host} `);
        
    } catch (error) {
        console.log(error);
        
    }
}

export default database