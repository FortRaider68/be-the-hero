const Express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const Connection = require('./Database/connection');
const Routes = Express.Router();

Routes.post('/session',SessionController.Create);

Routes.get('/ongs',OngController.Index);
Routes.post('/ongs',OngController.Create);

Routes.get('/profile',ProfileController.Index);

Routes.post('/incidents',IncidentController.Create);
Routes.get('/incidents',IncidentController.Index);
Routes.delete('/incidents/:id',IncidentController.delete);


module.exports = Routes;