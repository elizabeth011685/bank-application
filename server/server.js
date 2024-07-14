const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./admin');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var accountService = require('./services/account.js');
var depositService = require('./services/deposit.js');
var withdrawService = require('./services/withdraw.js');

const connectDb = require('./src/database');

app.get('/', (req, res) => {
  res.send('Hello from bank app \n');
});


app.get('/account/get/:email', (req, res) => {
  accountService.findByEmail(req.params.email).then((account) =>{
    console.log(account);
    res.send(account);
  });
});


app.get("/account/create/:name/:email/:password",  (req, res) => {
  accountService.create(
      req.params.name,
      req.params.email,
      req.params.password
  ).then(user =>{
    console.log(user);
    res.send(user);
  });
});

app.get("/account/all",  (req, res) => {

    let idToken = null;
    if(req.headers.authorization.startsWith('Bearer ') && req.headers.authorization) {
        idToken = req.headers.authorization.split(' ')[1]
    }

    if (!idToken) {
        res.status(401).send();
        return
    }

    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            accountService.all().then((accounts) =>{
                res.send(accounts);
            })
        }).catch(function(error) {
        res.status(401).send("Token invalid");
    });
    
});

app.post("/account/:user_id/deposit",  async (req, res) => {
 let id = req.params.user_id;
  let { deposit_value } = req.body;
  console.log(id, deposit_value);
  await depositService.create(
      id,
      deposit_value,
  ).then((account) =>{
      console.log("ACCOUNT: ",account);
      res.send(account);
  });
});

app.post("/account/:user_id/withdraw",  async (req, res) => {
    let id = req.params.user_id;
    let { withdraw_value } = req.body;
    console.log(id, withdraw_value);
    await withdrawService.create(
        id,
        withdraw_value,
    ).then((account) =>{
        console.log("ACCOUNT: ",account);
        res.send(account);
    });
});

// start server
// -----------------------
app.listen(8080, function () {
  console.log('Running on port 8080! - http://localhost:8080');
  connectDb().then(() => console.log('MongoDb connected'));
});
