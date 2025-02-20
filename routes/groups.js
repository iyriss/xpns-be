import { Router } from 'express';
import Group from '../models/Group.model.js';

const router = Router();

router.get('/api/groups', async (req, res) => {
  try {
    const owner = '67281eae57e23c4dda65f10c'; //req.session._id
    const groups = await Group.find({ owner }).sort({ _id: -1 });
    res.json({ data: groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/api/groups', async (req, res) => {
  try {
    const owner = '67281eae57e23c4dda65f10c'; //req.session._id
    const group = await Group.create({
      name: req.body.name,
      members: req.body.members,
      owner,
    });
    res.json({ data: group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
