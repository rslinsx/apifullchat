const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const PORT = process.env.PORT || 8081;

//Config
    // Body Parser(o próprio express agora tem essa função, daí nao precisa importar body-parser)
    app.use(express.urlencoded({extended:false}))
    app.use(express.json()) 
    app.use(cors());

const server = http.createServer(app);    

//Rotas EXPRESS
  // aqui será a rota da home calma que já volto aqui e penso em algo bacana para colocar
  app.get('/', (req, res)=>{
    res.send('Somente um teste');
  });

  app.get("/teste", (req,res)=>{
    res.send('Página testeeeeeeeeeeeeee!!!')
  });

server.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta: ${PORT}`);
});
