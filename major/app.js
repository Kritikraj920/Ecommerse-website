const express=require('express')
const app=express();
const port=9000;
const path=require('path');
const bodyparser=require("body-parser");
// getting-started.js
const mongoose = require('mongoose');  //load mongoose module


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Prience-Diwana');
console.log("mongoose connection sucessfull")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}//creating a connection

//for serving static files
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  message: String

});//creating a collection model

const contact = mongoose.model('contact', ContactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

//set the templetes as pug
app.set('view engine','pug')

//srt view directionary
app.set('views',path.join(__dirname,'views'))

//our pug demo endpoint
//ENd point
app.get("/",(req,res)=>{
  res.status(200).render("index.pug")
})


app.get("/contact",(req,res)=>{
  res.status(200).render("contact.pug")
})
app.post("/contact",(req,res)=>{
  var mydata= new contact(req.body);
  mydata.save().then(()=>{
    res.send("Your request has been Submited Thank-You")
  }).catch(()=>{
    res.status(400).send("Your request can not be submited sorry !!")
  })

})


app.get("/about",(req,res)=>{
  res.status(200).render("about.pug")
})


app.get("/services",(req,res)=>{
  res.status(200).render("services.pug")
})


app.listen(port,()=>{
    console.log(`sever is runing at port ${port}`)
})