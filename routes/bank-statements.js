import { Router } from 'express';
import BankStatement from '../models/BankStatement.model.js';
import Transaction from '../models/Transaction.model.js';
import Group from '../models/Group.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const user = req.userId;
    const bankStatements = await BankStatement.find({ user }).sort({ _id: -1 });
    res.json({ data: bankStatements });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.userId;
    const bankStatement = new BankStatement({
      title: req.body.title,
      user: userId,
    });

    const savedBankStatement = await bankStatement.save();
    res.json({ data: savedBankStatement });
  } catch (error) {
    console.error('Error creating bank statement:', error);
    res.status(400).json({ error: 'Failed to create bank statement' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await BankStatement.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating bank statement:', error);
    res.status(400).json({ error: 'Failed to update bank statement' });
  }
});

router.get('/:id/transactions', async (req, res) => {
  try {
    const user = req.userId;
    const bankStatement = await BankStatement.findById(req.params.id);
    const transactions = await Transaction.find({
      bankStatement: req.params.id,
    }).sort({ date: -1 });
    const groups = await Group.find({
      $or: [{ user }, { members: user }],
    })
      .populate('members')
      .sort({ _id: -1 });

    res.json({ data: { bankStatement, transactions, groups } });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transactionGrouped = await Transaction.findOne({
      bankStatement: req.params.id,
      group: { $exists: true },
    });

    if (transactionGrouped) {
      throw new Error(
        'Bank statement cannot be deleted because it contains grouped transactions.'
      );
    }

    await BankStatement.findByIdAndDelete(req.params.id);
    await Transaction.deleteMany({ bankStatement: req.params.id });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Bad Request' });
  }
});

router.put('/:id/ungroup', async (req, res) => {
  try {
    await Transaction.updateMany(
      {
        bankStatement: req.params.id,
        group: { $exists: true },
        user: req.userId,
      },
      { $unset: { group: '' } }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error ungrouping bank statement:', error);
    res
      .status(400)
      .json({ error: 'Failed to ungroup bank statement transactions' });
  }
});

export default router;
