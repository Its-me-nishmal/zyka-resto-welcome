import type { Request, Response, NextFunction } from 'express';
import connectDB from '../db.js';

export const dbMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection error in middleware:', error);
        res.status(500).json({ message: 'Internal Server Error: Database connection failed' });
    }
};
