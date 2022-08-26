const express = require('express');
const db = require('./database.js');
const bp = require('body-parser');
const app = express();
const port = 3000

//ROTAS
const routesReuniao = require('./routes/reunioes.js');

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.use('/reuniao', routesReuniao)
app.listen(port, () => console.log(`App listening on port ${port}.`));