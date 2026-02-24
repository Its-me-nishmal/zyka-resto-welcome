import type { Request, Response } from 'express';
import { StorageService } from '../services/StorageService.js';

export class SubmissionController {
    static async submit(req: Request, res: Response) {
        try {
            const { name, mobile, place, favoriteFood, visitTime, companionType, deviceId } = req.body;

            if (!name || !mobile || !place) {
                res.status(400).json({ message: 'Name, mobile, and place are required' });
                return;
            }

            const reward = 'Lucky Draw Entry';

            const submissionData = {
                name,
                mobile,
                place,
                favoriteFood,
                visitTime,
                companionType,
                reward,
                deviceId,
                createdAt: new Date()
            };

            const result = await StorageService.saveSubmission(submissionData);
            res.status(201).json({
                message: 'Submission successful',
                reward: result.reward,
                id: result._id
            });
        } catch (error) {
            console.error('Submission error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getRewards(req: Request, res: Response) {
        res.json([
            { id: 1, name: 'Free Coffee', description: 'Enjoy a hot cup of our signature coffee' },
            { id: 2, name: '10% Discount', description: 'Get 10% off on your next visit' },
            { id: 3, name: 'Free Dessert', description: 'A sweet treat on the house' },
        ]);
    }
}
