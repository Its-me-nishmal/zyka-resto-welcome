import fs from 'fs/promises';
import path from 'path';
import { Submission } from '../models/Submission.js';
const DATA_FILE_PATH = process.env.DATA_FILE_PATH || './data/submissions.json';
export class StorageService {
    static isMongoConnected = false;
    static setMongoConnected(status) {
        this.isMongoConnected = status;
    }
    static async saveSubmission(data) {
        if (this.isMongoConnected) {
            const submission = new Submission(data);
            return await submission.save();
        }
        else {
            return await this.saveToFile(data);
        }
    }
    static async getAllSubmissions() {
        if (this.isMongoConnected) {
            return await Submission.find().sort({ createdAt: -1 });
        }
        else {
            return await this.readFromFile();
        }
    }
    static async saveToFile(data) {
        const submissions = await this.readFromFile();
        const newSubmission = {
            ...data,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        submissions.push(newSubmission);
        await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(submissions, null, 2));
        return newSubmission;
    }
    static async readFromFile() {
        try {
            const content = await fs.readFile(DATA_FILE_PATH, 'utf-8');
            return JSON.parse(content);
        }
        catch (error) {
            return [];
        }
    }
}
//# sourceMappingURL=StorageService.js.map