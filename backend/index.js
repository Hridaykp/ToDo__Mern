import express from "express";
import mongoose from "mongoose";
import Env from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from './routes/index.js'
Env.config();
const PORT = process.env.PORT || 8000;
const app = express();

// middleware 
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api', allRoutes);


const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfuly connected to MongoDB !!`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on Port: ${PORT}`)
})
