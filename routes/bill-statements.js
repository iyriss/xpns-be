import { Router } from 'express';
import BillStatement from '../models/BillStatement.model.js';
import Transaction from '../models/Transaction.model.js';
import Group from '../models/Group.model.js';

const router = Router();

router.get('/api/bill-statements', async (req, res) => {
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

router.post('/api/bill-statements', async (req, res) => {
  try {
    const billStatement = await BillStatement.create({ title: req.body.title });
    res.json({ data: billStatement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/api/bill-statements/:id/transactions', async (req, res) => {
  try {
    const owner = '67281eae57e23c4dda65f10c'; //req.session._id

    const billStatement = await BillStatement.findById(req.params.id);
    const transactions = await Transaction.find({
      billStatement: req.params.id,
    }).sort({ date: -1 });
    const groups = await Group.find({
      $or: [{ owner }, { members: owner }],
    }).sort({ _id: -1 });

    res.json({ data: { billStatement, transactions, groups } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
