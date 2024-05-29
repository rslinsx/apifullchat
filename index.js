const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const PORT = process.env.PORT || 8081;
const {newUser, crmSchema, mensagensSchema, listConversas} = require("./mongodb");
const { default: mongoose } = require('mongoose');
require('dotenv').config()

//Config
    // Body Parser(o próprio express agora tem essa função, daí nao precisa importar body-parser)
    app.use(express.urlencoded({extended:false}))
    app.use(express.json()) 
    app.use(cors());

const server = http.createServer(app);    

//Conexão mongodb
require('./mongodb');

//Rotas EXPRESS
  // rota home teste
  app.get('/', (req, res)=>{
    res.send('hello');
  });

  app.get("/teste", (req,res)=>{
    res.send('Página testeeeeeeeeeeeeee!!!')
  });

  // carrega dados do perfil (primeiro nome, sobrenome e alterar senha por enquanto) na página perfil no front pegando do newUser /n
 // porque é um documento único com todos os users

 app.post('/perfil', (req, res)=>{
  newUser.findOne(req.body).then((data)=>{
    res.json(data);
  }).catch((err)=>{
    console.log(err);
  });
});

server.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta: ${PORT}`);
});
