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
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://fullchat-final.vercel.app/',
    methods: ['GET', 'POST']
  },
}); 


//Conexão mongodb
require('./mongodb');

//logica socket io

io.on('connection', socket => {
  console.log('usuario conectado!', socket.id);
});

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

// Carrega os contatos do CRM de cada usuário enviando ali no req body uma template string com `${email}contacts`
app.post('/crm/contatos', (req, res)=>{
  const todosUsuariosDeUmEmail = mongoose.model(req.body.crmBuscado, crmSchema);
  todosUsuariosDeUmEmail.find({}).then((data)=>{
    res.json(data);
  }).catch((err)=>{
    console.log(err);
  })
});


//Rota que verifica login e senha - a logica e a mensagem pra dizer 'senha ou usuario incorretos' coloquei no front
app.post('/login', (req, res)=>{
newUser.findOne(req.body).then((data)=>{
  res.json(data);
}).catch((err)=>{
  console.log('Deu esse erro: '+err);
});

});

//< ---------------------------------------------------------------------------------------------- >
  //Rotas CRM
  //rota para procurar contatos no CRM para cadastrar 
  app.post("/crm/procurar", (req, res)=>{
    newUser.findOne(req.body).then((data)=>{
      res.json(data);
    }).catch((err)=>{
      console.log(err);
    });
});

//Rota pra procurar contatos no CRM de quem pesquisou para iniciar conversa
app.post("/crm/procurarcontato", (req, res)=>{
    const crmDoContatoAtual = mongoose.model(`${req.body.emailUserAtual}contact`, crmSchema);
    crmDoContatoAtual.findOne({email: req.body.emailProcuradoCrm}).then((data)=>{
      res.json(data);
    }).catch((err)=>{
      console.log(err);
    })
})


//rota que cadastra efetivamente o contato no banco de dados de cada usuário no mongodb com nome 'email + contacts'
app.post("/crm/cadastrar", (req, res)=>{
  const novoContato = mongoose.model(`${req.body.emailUserAtual}contact`, crmSchema);
  novoContato.findOne({email: req.body.email}).then((data)=>{

  if(data === null){
  const novoNovoContato = new novoContato({
     email: req.body.email,
     firstname: req.body.nome,
     lastname: req.body.ultimoNome,
  });

  novoNovoContato.save().then(()=>{
     res.json('Usuário cadastrado com sucesso!');
  }).catch((err)=>{
     console.log(err)
  })}else{
    res.json('Esse email já está incluído no seu CRM')
   }})});



  // < -------------------------------------------------------------------------------------------------------------------------------------- >   
  //rota de registro de novo usuario
  app.post("/registro", (req, res)=>{
    newUser.findOne({email: req.body.email}).then((data)=>{
      if (data === null) {
        const novoRegistro = new newUser({
          email: req.body.email,
          senha: req.body.senha,
          firstname: req.body.nome,
          lastname: req.body.sobrenome,
          chave: true
          });

          novoRegistro.save().then(()=>{
          res.json('Usuário cadastrado com sucesso')
          }).catch((err)=>{
          console.log(err)
          })}else{
            res.json('Já há um cadastro com esse email!')
          }

          }).catch((err)=>{
      console.log(err);
    })});

server.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta: ${PORT}`);
});
