const mongoose = require('mongoose');
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl).then(()=>{
    console.log('Conectado com sucesso ao mongodb');
}).catch((err)=>{
    console.log('Erro ao conectar ao mongodb: '+ err);
});

const userSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
    senha: String,
    chave: Boolean
});

const listConversas = new mongoose.Schema({
    emailConversaAtual: String,
    keyConversation: String
});


const crmSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
})

const mensagensSchema = new mongoose.Schema({
    emailLogado: String,
    conteudo: String,
    keyMomentChat: String,
    hora: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

const newUser = mongoose.model('Users', userSchema);
const Mensagem = mongoose.model('Mensagens', mensagensSchema);


module.exports =  {
     Mensagem: Mensagem,
     newUser: newUser,
     crmSchema: crmSchema,
     mensagensSchema: mensagensSchema,
     listConversas: listConversas
}

