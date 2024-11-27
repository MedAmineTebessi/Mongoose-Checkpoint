const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({

  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});



const Person = mongoose.model("Person", PersonSchema);

module.exports = Person; 
