import mongoose from "mongoose"



export const userSchema = new mongoose.Schema({

    username:{
        type:String
    },
    password:{
        type: String
    },
    userData:{
        type: Array
    },
    token:{
        type: String,
        default: ""
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

});