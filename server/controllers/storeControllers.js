import { response } from "express";
import mongoose from "mongoose";
import { storeItemSchema } from "../models/storeItemModel";
import { AuthToken } from "./security/authToken";

const StoreItem = mongoose.model("storeItem", storeItemSchema);

export let storeTokens = new Array()

//POST
export const handlePost = (req, res) => {
    const requestBody = req.body;

    switch(requestBody.action){ 
        case 'make-new-item':{
            new StoreItem({
                itemName: requestBody.itemName,
                itemColor: requestBody.itemColor,
                itemPrice: requestBody.itemPrice
            }).save((err, storeItem)=>res.send(`Store item: '${storeItem.itemName}' posted`))
            break;
        }

        case 'delete-item':{
            StoreItem.findOneAndDelete({requestBody}, (err, item)=>res.send(`Deleted: ${item}`))
        }
    }
}

//GET
export const provideStoreItems = (req, res) => StoreItem.find({},(err,items)=>res.send(items))

//DELETE
export const deleteItem = (req, res) => StoreItem.findOneAndDelete({})