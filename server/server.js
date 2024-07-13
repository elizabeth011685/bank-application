const express = require('express');
const app = express();
const cors = require('cors');
const faker = require('faker');


// configure express to use cors()

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from Node.js app \n');
});

//rutas para banco

app.get("/account/create/:name/:email/:password", function (req, res) {
  res.send({
    name: req.params.name,
    email: req.params.email,
    password: req.params.password,
  });
});

// start server
// -----------------------
app.listen(8080, function () {
  console.log('Running on port 8080! - http://localhost:8080');
});
