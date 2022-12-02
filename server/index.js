import express from "express"
import mongoose from "mongoose"
import bodyparser from "body-parser"
import cors from "cors"
import { handlePost as handleUserPost } from './controllers/userControllers'
import { provideStoreItems } from "./controllers/storeControllers"
import { handlePost as handleStorePost } from "./controllers/storeControllers"

//const prompt = require('prompt-sync')({});


const app = new express()
const PORT = 4020
const ATLAL_URL = `mongodb+srv://Ade-user-2:admin123@cluster0.oe5ybr1.mongodb.net/test`

let listenForCommands = true

const COMPAS_URL = `mongodb://127.0.0.1/portfolio`

//mongo connection
mongoose.Promise = global.Promise
mongoose.connect(COMPAS_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

//bodyparser setup
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//CORS setup
app.use(cors())

app.route(`/portfolio/users`).post(handleUserPost)
app.route('/portfolio/store-items').get(provideStoreItems).post(handleStorePost)


app.get('/', (req, res) =>{
    res.send(
        "<div style='width: 100vw; height:100vh; display: flex; justify-content: center; align-items: center;'>\
        <a style= 'font-size: 50px;' href='http://127.0.0.1:5173/' >You look lost kid. Go to front end<a/>\
        </div>"
    )
})

app.listen(PORT, ()=>{
        console.log(`The Ade server is running on port: ${PORT}`)
        console.log("SERVER IS RUNNING - SUCCESS")
    }
)
