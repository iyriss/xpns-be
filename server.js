import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authMiddleware from './authMiddleware.js';
import allocationRoutes from './routes/allocations.js';
import billStatementRoutes from './routes/bill-statements.js';
import groupRoutes from './routes/groups.js';
import transactionRoutes from './routes/transactions.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI, {});

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true, //  Required for cookies to work
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/allocations', authMiddleware, allocationRoutes);
app.use('/api/bill-statements', authMiddleware, billStatementRoutes);
app.use('/api/groups', authMiddleware, groupRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.BASE_URL}:${PORT}`);
});
