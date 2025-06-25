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
    res.status(400).json({ message: 'Could not get transactions' });
  }
});

router.post('/', async (req, res) => {
  try {
    const transactions = await Transaction.insertMany(req.body);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not create transactions' });
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
    res.status(400).json({ message: 'Could not update transaction' });
  }
});

router.put('/:id/ungroup', async (req, res) => {
  try {
    await Transaction.findByIdAndUpdate(req.params.id, {
      $unset: { group: '' },
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not ungroup transaction' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not delete transaction' });
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
    res.status(400).json({ message: 'Could not get group transactions' });
  }
});

export default router;
