const express=require('express');
const  User  = require('../models/userModel.js');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
 const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(req.body)
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

   const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_KEY,
  { expiresIn: "1d" }
);

     console.log("User logged in")
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

 const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body)
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    await newUser.save()
     console.log("User signed in ")
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

 module.exports={login,signup}