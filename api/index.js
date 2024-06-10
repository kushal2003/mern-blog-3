import  express  from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import testRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config(); 

const app = express();
app.use(express.json()) 
// app.use('/api/auth/signup', signup)  
mongoose.connect(process.env.MONGO)
.then(()=>{ 
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
}) 
 

app.use('/api/user',testRouter)
app.use('/api/auth',authRouter) 
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode ||500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message})
})