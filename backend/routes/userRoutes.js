const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController'); // User controller
const { protect } = require('../middleware/authMiddleware'); // Authentication middleware
// Initialize router
const router = express.Router();
// Define routes for registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);
// Example of a protected route
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});
module.exports = router;