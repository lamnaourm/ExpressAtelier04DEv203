const express = require('express')
const { v4: uuid } = require('uuid')
const fs = require('fs')

const app = express();
const port = 3000;
const directory = './data'

app.use(express.json())


app.post('/produit', (req, res) => {

    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }

    const id = uuid();
    fs.writeFileSync(`${directory}/${id}.txt`,JSON.stringify(req.body));
    res.sendStatus(201);
});

app.listen(port, () => {
    console.log('Serveur lance ...');
})