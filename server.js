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
    const transactions = await Transaction.insertMany(req.body);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/bill-statements', async (req, res) => {
  try {
    // this is a huge aggregation look up checking for all transactions if we have users we should also check per user
    const result = await BillStatement.aggregate([
      {
        $lookup: {
          from: 'transactions',
          localField: '_id',
          foreignField: 'billStatement',
          as: 'transactions',
        },
      },
      {
        $project: {
          title: 1,
          nearestTransaction: { $min: '$transactions.date' },
          furthestTransaction: { $max: '$transactions.date' },
          transactionCount: { $size: '$transactions' },
        },
      },
    ]);
    res.json({ data: result });
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

app.get('/api/bill-statements/:id/transactions', async (req, res) => {
  try {
    const billStatement = await BillStatement.findById(req.params.id);
    const transactions = await Transaction.find({
      billStatement: req.params.id,
    }).sort({ date: -1 });

    res.json({ billStatement, transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
