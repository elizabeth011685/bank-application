const User = require("../src/models/user.model");
const faker = require('faker');
async function create(username, email, password){
    const user = new User({
        username: username,
        email:  email,
        password: password,
        account_number: faker.finance.account(16),
        balance:0
    });
    await user.save().then(() => console.log('User created'));
    return user;
}

async function all(){
    return await User.find();
}

module.exports = {create, all};