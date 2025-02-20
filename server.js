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

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/transactions-share', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/allocations', authMiddleware, allocationRoutes);
app.get('/api/bill-statements', authMiddleware, billStatementRoutes);
app.get('/api/groups', authMiddleware, groupRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
