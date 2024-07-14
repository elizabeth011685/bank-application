const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  value: {
    type: Number,
  },
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
