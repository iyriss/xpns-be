import { Router } from 'express';
import Group from '../models/Group.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const user = req.userId;
    const groups = await Group.find({
      $or: [
        { user }, // groups where user is owner
        { members: user }, // groups where user is a member
      ],
    })
      .sort({ _id: -1 })
      .populate('members', 'name');

    res.json({ data: groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .lean()
      .select('name members user')
      .populate('members', 'name');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json({ data: group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
