const express = require('express');
const router = express.Router();

let deals = []; // in-memory for dev

// GET /api/deals
router.get('/', (req, res) => {
  res.json(deals);
});

// POST /api/deals
router.post('/', (req, res) => {
  try {
    const { title, price, description, vendorId, vendorName } = req.body;
    if (!title || !price) return res.status(400).json({ message: 'Title and price required' });

    const newDeal = {
      id: Date.now().toString(),
      title,
      price,
      description: description || '',
      vendorId: vendorId || 'unknown',
      vendorName: vendorName || 'Vendor',
      createdAt: new Date().toISOString()
    };
    deals.unshift(newDeal);
    return res.status(201).json(newDeal);
  } catch (err) {
    console.error('POST /api/deals error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;