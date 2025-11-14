const express=require('express')
const { connectDb } = require('./config/db')
const cors=require('cors')
const app=express()
const authRoutes=require('./routes/authRoutes.js')
const User = require('./models/userModel.js')
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use("/auth", authRoutes);
app.get('/',async(req,res)=>{
   const resp=await User.find({})
   res.send(resp)
})
app.listen(3000,()=>{
    connectDb()
    console.log(" Server is created 🥹")
})