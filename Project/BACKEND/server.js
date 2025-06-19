const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Patient = require('./models/Patient');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/patient_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/patients', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.status(201).send(patient);
});

app.get('/patients', async (req, res) => {
  const patients = await Patient.find();
  res.send(patients);
});

app.put('/patients/:id', async (req, res) => {
  const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

app.delete('/patients/:id', async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.send({ message: 'Patient deleted' });
});

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
