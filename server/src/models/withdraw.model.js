const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  value: {
    type: Number,
  },
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;
