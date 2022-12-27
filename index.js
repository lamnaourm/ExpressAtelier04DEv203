const express = require("express");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;
const directory = "./data";

app.use(express.json());

app.post("/produits", (req, res) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const id = uuid();
  //fs.writeFileSync(`${directory}/${id}.txt`, JSON.stringify(req.body));
  fs.writeFileSync(path.join(directory, `${id}.txt`) , JSON.stringify(req.body));
  res.sendStatus(201);
});

app.get("/produits/all", (req, res) => {
  var prds = [];

  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    //const data = fs.readFileSync(`${directory}/${file}`, "utf8");
    const data = fs.readFileSync(path.join(directory, file), "utf8");
    prds.push({ id: file.split(".")[0], ...JSON.parse(data) });
  });

  res.status(202).json(prds);
});

app.get("/produits/id/:id", (req, res) => {
  const id = req.params.id;

  //if (!fs.existsSync(`${directory}/${id}.txt`)) {
  if (!fs.existsSync(path.join(directory, `${id}.txt`))) {
    return res.sendStatus(404);
  }

  const data = fs.readFileSync(path.join(directory, `${id}.txt`), "utf8");
  res.json({ id: id, ...JSON.parse(data) });
});

app.get("/produits/famille/:famille", (req, res) => {
  var prds = [];
  const famille = req.params.famille;

  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const data = fs.readFileSync(path.join(directory, file), "utf8");
    const produit = JSON.parse(data);

    if (produit.famille === famille)
      prds.push({ id: file.split(".")[0], ...produit });
  });

  res.status(202).json(prds);
});

app.put("/produits/:id", (req, res) => {
  const id = req.params.id;

  if (!fs.existsSync(`${directory}/${id}.txt`)) {
    return res.sendStatus(404);
  }

  fs.writeFileSync(path.join(directory, `${id}.txt`), JSON.stringify(req.body));
  res.end();
});

app.delete("/produits/:id", (req, res) => {
    const id = req.params.id;

    if (!fs.existsSync(path.join(directory, `${id}.txt`))) {
      return res.sendStatus(404);
    }

    fs.unlinkSync(`${directory}/${id}.txt`)
    res.end();
});

app.listen(port, () => {
  console.log("Serveur lance ...");
});
