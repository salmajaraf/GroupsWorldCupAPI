const PORT = process.env.PORT || 8000;

const express = require("express");
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json("Welcome to the World Cup 2030 API");
});

// Groups
app.get('/Groups', (req, res) => {
  fs.readFile('Groups.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.get('/Groups/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('Groups.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
      return;
    }
    const dataFormat = JSON.parse(data);
    const infoGrp = dataFormat.filter(group => group.id == id)[0];
    if (infoGrp) {
      res.json(infoGrp);
    } else {
      res.status(404).send('not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
