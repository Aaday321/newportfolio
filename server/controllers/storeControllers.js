import { response } from "express";
import mongoose from "mongoose";
import { storeItemSchema } from "../models/storeItemModel";
import { AuthToken } from "./security/authToken";
import Stripe from "stripe";
import dotenv from 'dotenv'

dotenv.config()



const StoreItem = mongoose.model("storeItem", storeItemSchema);

export let storeTokens = new Array()

//POST
export const handlePost = (req, res) => {
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)
    const requestBody = req.body;

    switch(requestBody.action){ 
        case 'make-new-item':{
            console.log(requestBody);
            //res.send('coo');
            
            new StoreItem({
                itemName: requestBody.itemName,
                itemColor: requestBody.itemColor,
                itemPrice: requestBody.itemPrice
            }).save((err, storeItem)=>{
                if(err) res.send(err);

                else res.send(`Store item: '${storeItem}' posted`)
            })
            break;
        }

        case 'delete-item':{
            StoreItem.findOneAndDelete({requestBody}, (err, item)=>res.send(`Deleted: ${item}`))
        }

        case 'buy-items':{
            let purchasableItems = new Array()
            let foundAll = false
            for(let i in requestBody.items){
                i = Number(i)
                const item = requestBody.items[i].item
                StoreItem.findOne({itemName: item.itemName}, (err, ITEM)=>{
                    ITEM.quantity = requestBody.items[i].quantity
                    purchasableItems.push(ITEM)
                    if(requestBody.items.length - 1 === i) foundAll = true
                })
            }
            let myIterval = setInterval(()=>{
                if(foundAll){
                        clearInterval(myIterval);
                        stripe.checkout.sessions.create({

                            payment_method_types: ['card'],
                            mode: 'payment',
                            line_items: purchasableItems.map((item)=>(
                                {
                                price_data: {
                                    currency: 'usd',
                                    product_data: {
                                        name: item.itemName
                                    },
                                    unit_amount: item.itemPrice
                                },
                                quantity: item.quantity
                            }
                            )),
                            success_url:`${process.env.CLIENT_URL}`,
                            cancel_url:`${process.env.CLIENT_URL}`
                            
                        }).then((session)=>res.send(session.url))
                        
                    
                    
                }
            },10)

          
        }
    }
}

//GET
export const provideStoreItems = (req, res) => StoreItem.find({},(err,items)=>res.send(items))

//DELETE
export const deleteItem = (req, res) => StoreItem.findOneAndDelete({})