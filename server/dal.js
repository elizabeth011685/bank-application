const User = require("./src/models/user.model");

async function create(username, email, password){
    const user = new User({
        username: username,
        email:  email,
        password: password,
        balance:0
    });
    await user.save().then(() => console.log('User created'));
    return user;
}

async function all(){
    return await User.find();
}

module.exports = {create, all};