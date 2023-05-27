const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const educatureSchema = new mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    image: String,
});

const blogModel = mongoose.model('Educature', educatureSchema);

//post

app.post('/api/educature',async(req,res)=>{
    const{name,price,desc,image} = req.body
    const newPost = new blogModel({
        name:name,
        price:price,
        desc:desc,
        image:image
    })
    await newPost.save()
    res.status(201).send({
        message:"Posted succesfully!",
        payload:newPost
    })
})

app.get('/api/educature',async(req,res)=>{
    const{name} = req.query
    const newGet = await blogModel.find()
    if(!name){
        res.status(200).send(newGet)
    }
    else{
        const searched = newGet.filter((x)=>(
            x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
        ))
        res.status(200).send(searched)
    }
})

//get id

app.get('/api/educature/:id',async(req,res)=>{
    const {id} = req.params
    const getID = await blogModel.findById(id)
    res.status(200).send(getID)
})

app.delete('/api/educature/:id',async(req,res)=>{
    const id = req.params.id
    const getDelete = await blogModel.findByIdAndDelete(id)
    res.status(202).send(getDelete)
})



DB_CONNECTION = process.env.DB_CONNECTION;
DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
    .connect(DB_CONNECTION.replace("<password>", DB_PASSWORD))
    .then(() => console.log("MangoDB Connected!!!"));

PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
