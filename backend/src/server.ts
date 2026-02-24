import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import { StorageService } from './services/StorageService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

const startServer = async () => {
    if (!MONGO_URI) {
        console.error('CRITICAL: MONGO_URI is not provided. Backend require MongoDB to function.');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
