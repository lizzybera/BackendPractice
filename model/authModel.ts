import mongoose, { Schema } from "mongoose";

interface iAuth {
    name : string;
    email : string;
    password : string;
    image : string;
    imageID : string;
    verified : boolean;
    token : string;
    practice : {}[];
}

interface iAuthData extends iAuth, mongoose.Document{}

const authModel = new Schema<iAuthData>({
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
        required : [true, "Please input email"]
    },
    password : {
        type : String,
    },
    image : {
        type : String,
    },
    imageID : {
        type : String,
    },
    verified : {
        type : Boolean,
    },
    token : {
        type : String,
    },
    practice:[{
        type:mongoose.Types.ObjectId,
        ref:"practices"
    }]
}, {timestamps : true})

export default mongoose.model<iAuthData>("users", authModel)