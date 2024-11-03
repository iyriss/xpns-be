const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Transaction = require('./models/Transaction.model');
const BillStatement = require('./models/BillStatement.model');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/transactions-share', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    console.log('Req body', req.body);
    const transactions = await Transaction.insertMany(req.body);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/bill-statements', async (req, res) => {
  try {
    const billStatements = await BillStatement.find({});
    const transactions = await Transaction.find({});
    res.json({ data: billStatements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/bill-statements', async (req, res) => {
  try {
    const billStatement = await BillStatement.create({ title: req.body.title });
    res.json({ data: billStatement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
