const express = require('express');
const db = require('./database.js');
const bp = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000
const logger = require('./middleware/logger.js')
//ROTAS
const routesReuniao = require('./routes/reunioes.js');
const routesUser = require('./routes/user.js')
const routerGeral = require('./routes/geral.js')


app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.use(logger);

app.use('/reuniao', routesReuniao)
app.use('/user', routesUser)
app.use('/', routerGeral)
app.listen(port, () => console.log(`App listening on port ${port}.`));