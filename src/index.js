const Express = require('express');
const Routes = require('./routes');
const Cors = require('cors');

const App = Express();

App.use(Cors());

App.use(Express.json());

App.use(Routes);

App.listen(3333);

//Rotas
//Recurso:Associado geralmente a alguma tabela no banco de dados.

// metodos HTTP:
//Get:Busca Informações no Back-End.
//Post:Criar uma informação no Back-End
//Put:Alterar informações Back-End
//Delete:Deleta informação do Back-End

// Tipos de Parametros:
// Query Params:Parametros nomeados enviados na rota apos o '?'(filtros,Paginação).
// Route Params:Parametros utilizados para indentificar recursos.
//Request Body: Corpo da requisição,utilizado para criar ou alterar recursos.

//SQL:MySQL,Oracle,SQLite
//NoSQL:MongoDB
// driver:Select from User
//Query Builder:table('users').select('*').where();


