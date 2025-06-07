import { Router } from 'express';
import BillStatement from '../models/BillStatement.model.js';
import Transaction from '../models/Transaction.model.js';
import Group from '../models/Group.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const user = req.userId;
    const billStatements = await BillStatement.find({ user }).sort({ _id: -1 });
    res.json({ data: billStatements });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.userId;
    const billStatement = new BillStatement({
      title: req.body.title,
      user: userId,
    });

    const savedBillStatement = await billStatement.save();
    res.json({ data: savedBillStatement });
  } catch (error) {
    console.error('Error creating bill statement:', error);
    res.status(400).json({ error: 'Failed to create bill statement' });
  }
});

router.get('/:id/transactions', async (req, res) => {
  try {
    const user = req.userId;
    const billStatement = await BillStatement.findById(req.params.id);
    const transactions = await Transaction.find({
      billStatement: req.params.id,
    }).sort({ date: -1 });
    const groups = await Group.find({
      $or: [{ user }, { members: user }],
    }).sort({ _id: -1 });

    res.json({ data: { billStatement, transactions, groups } });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const billStatement = await BillStatement.findByIdAndDelete(req.params.id);
    res.json({ data: billStatement });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

export default router;
