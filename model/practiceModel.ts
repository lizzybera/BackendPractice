import mongoose, { Schema } from "mongoose";

interface iPractice {
    name : string;
    task : string;
    image : string;
}

interface iPracticeData extends iPractice, mongoose.Document{}

const practiceModel = new Schema({
    name : {
        type : String,
        require : true
    },
    task : {
        type : String,
    },
    image : {
        type : String,
    },
}, {timestamps : true})

export default mongoose.model<iPracticeData>("practices", practiceModel)