import express from 'express';
import { Character } from '../models/index.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', async (req, res) => { 
  try { 
    const list = await Character.findAll(); res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } });

router.get('/:id', async (req, res) => {
  try {
    const item = await Character.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' }); 
    res.json(item); } catch (err) { res.status(500).json({ message: err.message }); 
  } });

router.post('/', protect, async (req, res) => {
  try {
    const created = await Character.create(req.body); 
    res.status(201).json(created); 
  } catch (err) { res.status(400).json({ message: err.message }); } });

router.put('/:id', protect, async (req, res) => {
  try { 
    const [updated] = await Character.update(req.body, { where: { char_id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    const item = await Character.findByPk(req.params.id); res.json(item); 
  } catch (err) { res.status(400).json({ message: err.message }); } });

router.delete('/:id', protect, async (req, res) => {
  try { const deleted = await Character.destroy({ where: { char_id: req.params.id } }); 
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' }); 
  } catch (err) { res.status(500).json({ message: err.message }); } });

export default router;