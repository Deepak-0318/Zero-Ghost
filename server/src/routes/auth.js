const express = require('express');
const router = express.Router();

// In-memory users for dev only (replace with DB calls later)
let users = [];

// POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const exists = users.find(u => u.email === email);
    if (exists) return res.status(409).json({ message: 'User already exists' });

    const user = { id: Date.now().toString(), email, role: role || 'student' };
    // NOTE: storing plain passwords is only for local dev — replace with hashing in production
    users.push({ ...user, password });
    // Return user without password
    return res.status(201).json({ message: 'Registered', user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('POST /api/auth/register error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({ message: 'OK', user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('POST /api/auth/login error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;