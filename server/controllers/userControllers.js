import { response } from "express";
import mongoose from "mongoose";
import { userSchema } from "../models/userModel";
import { AuthToken } from "./security/authToken";

export let activeTokens = new Array()

const User = mongoose.model("user", userSchema);
let counter = 0
//POST
export const handlePost = (req, res) => {

    const request = req.body
    
    if(!request.action){res.status(400).send("Invalid Request"); console.log("Invalid Request")}

    switch(request.action){

        //LOGIN
        case "login":{
            User.findOne({username: request.username}, (err, foundUser) =>{
                if(!foundUser){
                    res.status(401).send("User not found")
                }else{
                    if(request.password !== foundUser.password){
                        res.status(401).send("Incorrect password")
                    }else{

                        const sendableUser = {
                            username: foundUser.username
                        };
                        const Token = new AuthToken(sendableUser)

                        if(!activeTokens.includes(Token))activeTokens.push(Token)

                        foundUser.token = Token.token
                        foundUser.save()

                        res.send({
                            msg:"You're logged in!", 
                            token: Token,
                            userData:foundUser.userData
                        })
                    }
                }
            })
            return;
        } 

        //CREATE NEW USER AND VERIFY USERNAME
        case "create_user":{
            console.log(request);
            User.findOne({ username: request.username }, (err, user) => {
                if (user) {
                  res.status(401).send("Username already taken");
                  return
                } else {
                    const Token = new AuthToken({username:request.username})
                    activeTokens.push(Token)
                    new User({
                        username:request.username,
                        password:request.password,
                        token: Token.token
                    }).save((err, newUser)=>{
                        
    
                        newUser.token = Token.token
                        newUser.save()
    
                        
                        res.send({
                            msg:"Your account has been created and you're logged in",
                            token: Token
                        })
                    });
                }
            });
            return
        }

        case "re-autherize":{
            let foundActive = false
            const findByToken = request.token

            for(let i of activeTokens){
                if(i.token == findByToken){
                    foundActive = i;
                    break;
                }
            }
            if(foundActive){
                User.findOne({token: findByToken}, (err, foundUser) =>{     
                    res.status(200).send({token: foundActive, userData:foundUser.userData,
                    msg: "You're still logged in"})
                    return
                })
            }else{
                res.status(401).send("You've been logged out")
            }
            
            break;
        }

        case "logout":{
            activeTokens = activeTokens.filter((t)=>t.user.username != request.user.username)
            res.status(200).send("Logged out")
            break;
        }

        case 'add-item':{
            User.findOne({username: request.user.username}, (err, foundUser)=>{
                if(err)return
                foundUser.userData = [...foundUser.userData, request.newUserData]
                foundUser.save()
                res.send(foundUser.userData)
            })
            break;
        }

        case 'delete-item':{
            User.findOne({username: request.user.username}, (err, foundUser)=>{
                if(err)return
                let deletedOne = false;
                foundUser.userData = foundUser.userData.filter((item)=>{
                    if(item === request.item && deletedOne === false){
                        deletedOne = true
                        return false
                    }else return true
                })
                foundUser.save()
                res.send(foundUser.userData)
            })
            break;
        }

    }
};




//GET
export const getUser = (req, res)=>{

    console.log(req);

}
//PUT
export const updateUser = (req, res) => {
    
    ToDo.findOneAndUpdate({_id: req.params.ToDoId}, req.body, {new: true}, (err, ToDo) =>{
        if (err){
            res.send(err)
        }
        res.json(ToDo)
    })
}