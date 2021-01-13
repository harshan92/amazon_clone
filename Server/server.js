const express = require('express')
const morgan = require('morgan')
const bodyParser=require("body-parser")
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const User=require("./models/user")

dotenv.config()
const app = express()

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("DB connected.");
    }
})

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000

app.get('/', (req, res) => res.json('Hello World!'))
app.post('/', (req, res) =>{
    let user=new User();
    user.name=req.body.name
    user.email=req.body.email
    user.password=req.body.password
    user.save(err=>{
        if(err){
            res.json(err)
        }else{
            res.json("Successfully saved!")
        }
    })
})
app.listen(port, error=>{
    if(error) console.log(error);
    else console.log("Server is running on port "+port);
})