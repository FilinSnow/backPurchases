const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchasesScheme = new Schema({
  text: String,
  date: String,
  price: Number,
});

module.exports = Purchases = mongoose.model('purchases', purchasesScheme);