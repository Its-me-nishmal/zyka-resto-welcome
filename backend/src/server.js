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
    if (MONGO_URI) {
        try {
            await mongoose.connect(MONGO_URI);
            console.log('MongoDB connected successfully');
            StorageService.setMongoConnected(true);
        }
        catch (error) {
            console.error('MongoDB connection failed, falling back to file system:', error);
            StorageService.setMongoConnected(false);
        }
    }
    else {
        console.log('No MONGO_URI provided, using file system storage');
        StorageService.setMongoConnected(false);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map