const express = require('express')
const morgan = require('morgan')
const bodyParser=require("body-parser")
const mongoose=require("mongoose");
const dotenv=require("dotenv")
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
app.post('/', (req, res) => console.log(req.body.name))
app.listen(port, error=>{
    if(error) console.log(error);
    else console.log("Server is running on port "+port);
})