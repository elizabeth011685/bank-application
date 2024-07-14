const Withdraw = require("../src/models/withdraw.model");
const User = require("../src/models/user.model");

async function create(userId,value){
    const withdraw = new Withdraw({
        userId: userId,
        value : parseFloat(value)
    });
    await withdraw.save().then(() => console.log('withdraw created'));
    let user =  await User.findOne({_id: userId});
    let balance = parseFloat(user.balance);
    balance -= parseFloat(value);
    user.balance = balance;
    user.save();
    return user;
}

async function all(){
    return await Withdraw.find();
}

module.exports = {create, all};