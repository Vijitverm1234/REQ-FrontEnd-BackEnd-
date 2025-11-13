const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController.js');
const authenticate = require('../middleware/auth.js'); 
const User = require('../models/userModel.js'); 
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, async (req, res) =>{
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;