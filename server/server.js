const express = require('express');
const app = express();
const cors = require('cors');

var accountService = require('./services/account.js');

const connectDb = require('./src/database');
//const faker = require('faker');

// configure express to use cors()

app.use(cors());

/*app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/user-create', async (req, res) => {
  const user = new User({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  });

  await user.save().then(() => console.log('User created'));

  res.send('User created \n');
});

app.get('/users-delete', async (req, res) => {
  await User.deleteMany({}).then(() => console.log('Users deleted'));

  res.send('Users deleted \n');
});
*/
app.get('/', (req, res) => {
  res.send('Hello from bank app \n');
});

//rutas para banco

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
  accountService.all().then((accounts) =>{
    console.log(accounts);
    res.send(accounts);
  })
});

// start server
// -----------------------
app.listen(8080, function () {
  console.log('Running on port 8080! - http://localhost:8080');
  connectDb().then(() => console.log('MongoDb connected'));
});
