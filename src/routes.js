const express = require('express');


const EmController = require('./controllers/EmController');
const UnController = require('./controllers/UnController');
const AcceptController = require('./controllers/AcceptController');
const ReceivedController = require('./controllers/ReceivedController');
const LoginController = require('./controllers/LoginController');
const ButtonController = require('./controllers/ButtonController');
const NotifiController = require('./controllers/NotifiController');
const ModifyController = require('./controllers/ModifyController');

const routes = express.Router();

routes.post('/un', UnController.store);
routes.get('/un', UnController.index);
routes.post('/em', EmController.store);
routes.get('/em', EmController.index);
routes.post('/em/:empId/accept', AcceptController.store);
routes.get('/em/receiveds', ReceivedController.index);
routes.get('/login', LoginController.show);
routes.post('/em/receiveds/button', ButtonController.store);
routes.get('/notifi', NotifiController.show);
routes.post('/modify', ModifyController.store);

module.exports = routes;
