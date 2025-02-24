import { Router } from 'express';
import Group from '../models/Group.model.js';

const router = Router();

router.get('/api/groups', async (req, res) => {
  try {
    const user = req.userId;
    const groups = await Group.find({ user }).sort({ _id: -1 });
    res.json({ data: groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/api/groups', async (req, res) => {
  try {
    const user = req.userId;
    const group = await Group.create({
      name: req.body.name,
      members: req.body.members,
      user,
    });
    res.json({ data: group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
