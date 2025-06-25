import { Router } from 'express';
import Category from '../models/Category.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({
      $or: [{ userId: req.userId }, { userId: { $exists: false } }],
    });

    res.json({ data: categories });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not get categories' });
  }
});

export default router;
