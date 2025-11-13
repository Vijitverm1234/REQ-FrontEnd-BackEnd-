
const env = require('dotenv');
env.config()
const mongoose=require('mongoose')
 const connectDb=()=>{
   mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));
}
module.exports={connectDb}
