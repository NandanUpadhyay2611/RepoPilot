import express from 'express';
import cors from 'cors';
import prisma from './prismaClient.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv'
import { clerkMiddleware, getAuth } from '@clerk/express';

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;


app.use(cors({
    origin: process.env.FRONTEND_HOSTED_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials:true,
}));

app.use(clerkMiddleware());
app.use(express.json());
app.use((req,res,next)=>{
    const { userId } = getAuth(req) || {};
    req.user={clerkId:userId};
    next();
})

app.get('/',(req,res)=>{
    res.send("App running");
});

app.use('/api',userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
