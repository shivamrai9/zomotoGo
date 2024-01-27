const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  CategoryName: String,
  name: String,
  img: String,
  options: [
    {
      half: String,
      full: String,
    },
  ],
  description: String,  
});

const FoodItems = mongoose.model('FoodItems', menuSchema);

module.exports = FoodItems;
