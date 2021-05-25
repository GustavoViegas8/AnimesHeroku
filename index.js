const express = require('express');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(routes)

app.get('/', (req, res) => {

 res.send('Hello World!')

})

app.listen(port, () => {
 console.log(`Servidor rodando em localhost:${port}`)

})

