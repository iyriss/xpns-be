import { Router } from 'express';
import MappingTemplate from '../models/MappingTemplate.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const user = req.userId;
    const mappingTemplates = await MappingTemplate.find({ user }).sort({
      _id: -1,
    });
    res.json({ data: mappingTemplates });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = req.userId;
    const mappingTemplate = await MappingTemplate.create({ ...req.body, user });
    res.json({ data: mappingTemplate });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

export default router;
