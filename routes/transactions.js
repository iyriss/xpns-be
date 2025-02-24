import { Router } from 'express';
import Transaction from '../models/Transaction.model.js';

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
    console.log('transactions', transactions);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
