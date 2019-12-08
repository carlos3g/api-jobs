require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch((err) => { console.log(`Não foi possível se conectar ao mongoDB. \nErro: ${err}`) })


app.use(cors()); // permite o uso da API por qualquer um (ex: React)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')) // mostra logs no terminal
app.use(routes);



app.listen( process.env.PORT || 3333);
