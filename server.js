import express from "express";
import httpObj from "http";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
//configure env
dotenv.config();

//databse confi
connectDB();

const app=express();
const http=httpObj.createServer(app);

//middelwave
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);

//rest api
app.get('/',(req,res)=>{
    res.send('<h1>welcome</h1>');    
});

//Port
const PORT = process.env.PORT || 8000;

//run listen 
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
});

