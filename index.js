//Criando as variaveis de inicialização do node
const express = require(`express`);
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const mysql = require('mysql');

//Criando configuração do body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//Criando as rotas de api
const router = express.Router();
router.get('/',(req, res) => res.json({message:'Funcionando'}));
app.use('/', router)

//rota clientes
router.get('/clientes', (req, res) =>{
    execSqlQuery('SELECT * FROM Clientes', res);
})

//rota cliente pesquisa por id
router.get('/clientes/:id?', (req, res) =>{
   let filter = '';
   if(req.params.id){
    filter = ' Where id= ' + parseInt(req.params.id);
        execSqlQuery('SELECT * FROM Clientes' + filter, res);
    }
})

//rota para deletar o cliente por id
router.get('/clientes/:id', (req, res) =>{
    if(req.params.id){
        execSqlQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
    }
   
 })
///fim de rotas



app.listen(port);
console.log('Api funcionando');


//querys
function execSqlQuery(sql, res){
    const connection = openMysql();
    connection.query(sql, function(error, results, fields){
        if(error)
        res.json(error);
        else
        res.json(results);
        connection.end();
        console.log("executou a query")
    });
    
}

function openMysql(){
    const connection = mysql.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'node'
    });
    return connection;
}