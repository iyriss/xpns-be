import { Router } from 'express';
import Transaction from '../models/Transaction.model.js';
import calculateSettlements from '../utils/settlements.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const user = req.userId;
    const transactions = await Transaction.find({ user });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const transactions = await Transaction.insertMany(req.body);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ data: transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/group/:id', async (req, res) => {
  try {
    const groupTransactions = await Transaction.find({
      group: req.params.id,
    })
      .sort({ date: -1 })
      .populate('user allocation.members.user')
      .lean();

    const settlements = calculateSettlements(groupTransactions);
    res.json({ data: { groupTransactions, settlements } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
