const express = require('express')
const { v4: uuid } = require('uuid')
const fs = require('fs')

const app = express();
const port = 3000;
const directory = './data'

app.use(express.json())


app.post('/produits', (req, res) => {

    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }

    const id = uuid();
    fs.writeFileSync(`${directory}/${id}.txt`,JSON.stringify(req.body));
    res.sendStatus(201);
});

app.get('/produits/all', (req, res) => {

    var prds = []
    
    const files = fs.readdirSync(directory); 

    files.forEach(file => {
        const data = fs.readFileSync(`${directory}/${file}`,'utf8');
        prds.push({id:file.split('.')[0] , ...JSON.parse(data)})
    });

    res.status(202).json(prds);
})

app.get('/produits/id/:id', (req, res) => {

})

app.get('/produits/famille/:famille', (req, res) => {
    
})

app.put('/produits/:id', (req, res) => {
    
})

app.delete('/produits/:id', (req, res) => {
    
})

app.listen(port, () => {
    console.log('Serveur lance ...');
})