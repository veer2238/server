const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const server = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log('db connected')
}

const userSchema = new mongoose.Schema({
    username: String,
    password:String
  });

  const User = mongoose.model('User', userSchema);

server.use(cors());
server.use(bodyParser.json());


// CRUD - create
server.post('/demo',async(req,res)=>{

  // mail

  let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'veer2238rajput@gmail.com',
            pass: 'jeasqtbfommzmxya'
        },
      });

      let info = await transporter.sendMail({
        from: 'veer2238rajput@gmail.com', // sender address
        to: "sonu2238rajput@gmail.com", // list of receivers
        cc:"himasnhu0409agraval@gmail.com",
        subject: "thanks for registration", // Subject line
        text: "Hello world?", // plain text body
        html: req.body.username
      });

      console.log("Message sent: %s", info.messageId);

    let user = new User()
    user.username = req.body.username;
    user.password = req.body.password;
    const doc = await user.save();

    console.log(doc)
    res.json(doc);
})

server.get('/demo',async(req,res)=>{
  const docs = await User.find({})
  res.json(docs)
})


server.listen(8080,()=>{
    console.log('connected')
})