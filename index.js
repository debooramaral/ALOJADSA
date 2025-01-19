const express = require('express');
const app = express();
const connectDataBase = require('./src/database/db.js');

const userRoute = require('../ALOJADSA/src/routes/user.route.js');
const produtoRoute = require('../ALOJADSA/src/routes/produto.route.js');

const port = 3000;

connectDataBase();

app.use(express.json())
app.use("/user", userRoute);
app.use("/produto", produtoRoute);

app.listen(port, () => console.log(`Servidor Rodando na Porta ${port}`));