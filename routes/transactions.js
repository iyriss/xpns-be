import { Router } from 'express';
import Transaction from '../models/Transaction.model.js';

const router = Router();

router.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.insertMany(req.body);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
