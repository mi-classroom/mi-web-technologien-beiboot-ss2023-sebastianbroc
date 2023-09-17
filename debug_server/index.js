const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

let jsonParser = bodyParser.json()

app.use(cors());

app.post('/log', jsonParser, (req, res) => {
    console.log(req.body);
    res.sendStatus(200)
});

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});


app.listen(port, () => console.log(`listening on port ${port}!`));
