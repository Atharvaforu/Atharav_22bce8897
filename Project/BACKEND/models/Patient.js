const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  diagnosis: String
});

module.exports = mongoose.model('Patient', patientSchema);
