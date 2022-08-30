const express = require('express');
const db = require('./database.js');
const bp = require('body-parser');
const app = express();
const port = 3000
const logger = require('./middleware/logger.js')
//ROTAS
const routesReuniao = require('./routes/reunioes.js');
const routesUser = require('./routes/user.js')

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.use(logger);

app.use('/reuniao', routesReuniao)
app.use('/user', routesUser)
app.listen(port, () => console.log(`App listening on port ${port}.`));