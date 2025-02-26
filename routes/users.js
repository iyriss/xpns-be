import { Router } from 'express';
import User from '../models/User.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [users, currentUser] = await Promise.all([
      User.find().lean(),
      User.findById(req.userId).lean(),
    ]);

    res.json({ data: users, currentUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

export default router;
