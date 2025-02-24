import { Router } from 'express';
import BillStatement from '../models/BillStatement.model.js';
import Transaction from '../models/Transaction.model.js';
import Group from '../models/Group.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const owner = req.userId;
    console.log('owner', owner);
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
    res.status(400).json({ message: 'Bad Request' });
  }
});

router.post('/', async (req, res) => {
  try {
    const billStatement = await BillStatement.create({ title: req.body.title });
    res.json({ data: billStatement });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

router.get('/:id/transactions', async (req, res) => {
  try {
    console.log('req.userId', req.userId);
    const owner = req.userId;

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
    res.status(400).json({ message: 'Bad Request' });
  }
});

export default router;
