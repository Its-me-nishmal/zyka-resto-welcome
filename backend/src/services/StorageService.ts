import { Submission } from '../models/Submission.js';

export class StorageService {
    static async saveSubmission(data: any): Promise<any> {
        const submission = new Submission(data);
        return await submission.save();
    }

    static async getAllSubmissions(): Promise<any[]> {
        return await Submission.find().sort({ createdAt: -1 });
    }
}
