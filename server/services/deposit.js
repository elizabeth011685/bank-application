const Deposit = require("../src/models/deposit.model");
const User = require("../src/models/user.model");

async function create(userId,value){
    const deposit = new Deposit({
        userId: userId,
        value : parseFloat(value)
    });
    await deposit.save().then(() => console.log('Deposit created'));
    let user =  await User.findOne({_id: userId});
    let balance = parseFloat(user.balance);
    balance += parseFloat(value);
    user.balance = balance;
    return user;
}

async function all(){
    return await User.find();
}

async function findByEmail(email){
    return await User.findOne({email: email});
}

module.exports = {create, all, findByEmail};