import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { Weapon } from '../models/index.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const list = await Weapon.findAll();
    return res.json(list);
  } catch (err) {
    return res.status(500).json({ message: 'Server error saat mengambil daftar senjata.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Weapon.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Senjata tidak ditemukan.' });
    }

    return res.json(item);
  } catch (err) {
    return res.status(500).json({ message: 'Server error saat mengambil data senjata.' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const created = await Weapon.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const [updatedCount] = await Weapon.update(req.body, { 
      where: { weapon_id: req.params.id } 
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Senjata tidak ditemukan atau tidak ada perubahan data.' });
    }
    
    const item = await Weapon.findByPk(req.params.id);
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedCount = await Weapon.destroy({ 
      where: { weapon_id: req.params.id } 
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Senjata tidak ditemukan.' });
    }
    
    return res.json({ message: 'Senjata berhasil dihapus.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error saat menghapus senjata.' });
  }
});

export default router;