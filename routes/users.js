import { Router } from 'express';
import User from '../models/User.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    const currentUser = users.find((u) => u._id.toString() === req.userId);

    res.json({ data: users, currentUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

export default router;
