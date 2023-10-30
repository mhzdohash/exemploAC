const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Configuração básica
const router = require('express').Router();
const app = express();
app.use(bodyParser.json()); //Para ler o corpo da requisição no formato json

//Conexão do banco
mongoose.connect("mongodb://127.0.0.1:27017/rev",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000
});

//model
const UserSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    password : {type : String, required : true}
});

const User = mongoose.model('User', UserSchema);

//Criando uma rota GET
app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/index.html")
});

//Criando rota de teste
router.post("/cadastro", async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(name == null || email == null || password == null){
        return res.status(400).json({error : "Digite os campos!"})
    }
    try{
        const newUser = await User.save();
        res.json({error : null, msg: "Cadastro ok!"})
    }
    catch(error){
        res.status(400).json({error})
    }
});

app.listen(3000, ()=>{
    console.log("Rodando na porta 3000")
})