//A constante 'bancodados' vai intermediar a relação com o banco de dados, através das instruções do arquivo conexão
const bancodados = require('./conexao');
//A constante express vai armazenar as ferramentas do módulo (framework) express
const express = require('express');
//Acredito que isso seja elemento de estética do código
const app = express();
//constante que armazena as ferramenta de manipulação das informações enviadas pelo cliente
const body = require('body-parser');

//roteia as informações da biblioteca JSON para manipulação pelo express
app.use(body.json());

//Pegar informações no banco de dados
//Para ativar a requisição é necessário apresentar na barra de endereço apenas o endereço da pagina
//Exemplo: "http://localhost:8080/"
app.get('/', async(req, res) => {
   const consulta = "select * from CURSO";

   bancodados.query(consulta, function(err, result){
      if (err){
         console.log(err);
      }else{

         res.send(result);
      }
   });
});

//Para ativar a requisição é necessário apresentar na barra de endereço o endereço da pagina e a requisição ":id"
//Exemplo: "http://localhost:8080/:id"
app.get('/:id', async(req, res) => {
   const consulta = "select * from CURSO where id = ?";

   bancodados.query(consulta, [req.params.id] ,function(err, result){
      if (err){
         console.log(err);
      }else{

         res.send(result);
      }
   });
});

//Inserindo informações no banco de dados
//Para inserir uma requisição no banco de dados é necessário uma aplicação auxiliar pois há a necessidade de editar o corpo da pagina '/inserir'
//A aplicação RESTer foi utilizada para auxiliar
/*
CONFIGURANDO O RESTer
Informações do HEADERS
- Name: "Content-Type"
- Value: "application/json"
Informação do BODY
- Conteúdo: "{"nome": "LPII"}"
*/
//O conteúdo da aula de bibliotecas deve ser revisitado para melhor compreensão do processo
//A aplicação auxiliar realiza a alteração e envia a requisição para o servidor que responde de acordo com o definido no código
app.post('/inserir', async(req, res) => {
   const inserir = "INSERT INTO CURSO SET nome = ?";

   const body = req.body;

   bancodados.query(inserir, [body.nome] ,function(err, result){
      if (err){
         console.log(err);
      }else{

         res.send(result);
      }
   });
});

//Atuaização de dados em uma requisição (mudança)
//Exemplo de Requisição: localhost:8080/alterar/:iddb
//Para alterar uma requisição no banco de dados é necessário uma aplicação auxiliar pois há a necessidade de editar o corpo da pagina
//A aplicação RESTer foi utilizada para auxiliar
/*
CONFIGURANDO O RESTer
Informações do HEADERS
- Name: "Content-Type"
- Value: "application/json"
Informação do BODY
- Conteúdo: "{"nome": "valor a ser atribuido"}"
*/
app.put('/alterar/:id', async(req, res) => {
   const alterar = "UPDATE CURSO SET nome = ? where id = ?";

   const body = req.body;

   bancodados.query(alterar, [body.nome, req.params.id] ,function(err, result){
      if (err){
         console.log(err);
      }else{

         res.send(result);
      }
   });
});

//Deletar uma informação em um banco de dados
//Para alterar uma requisição no banco de dados é necessário uma aplicação auxiliar
//A aplicação RESTer foi utilizada para auxiliar
/*
CONFIGURANDO O RESTer
Informações do HEADERS
- Name: "Content-Type"
- Value: "application/json"
Informação do BODY
- Conteúdo: "{"nome": "valor a ser atribuido"}"
*/
  app.delete('/delete/:id', async(req, res) => {
    const del = "DELETE from CURSO where id = ?";
 
    bancodados.query(del, [req.params.id] ,function(err, result){
       if (err){
          console.log(err);
       }else{
 
          res.send(result);
       }
    });
  });

  //Ver: Arquitetura MVC
  //Instalar o DB e colocar para instalar

  app.listen(8080, () => {
   console.log("Servidor iniciado na porta 8080: http://localhost:8080");
   });