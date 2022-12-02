import mongoose from "mongoose"



export const storeItemSchema = new mongoose.Schema({

    itemName:{
        type:String
    },
    itemColor:{
        type: String
    },
    itemPrice:{
        type: Number
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

});