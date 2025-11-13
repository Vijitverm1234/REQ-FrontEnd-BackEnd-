const express=require('express')
const { connectDb } = require('./config/db')
const app=express()
const authRoutes=require('./routes/authRoutes.js')
// app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.get('/',(req,res)=>{
    res.json({message:"Hello server"})
})
app.listen(3000,()=>{
    connectDb()
    console.log(" Server is created 🥹")
})