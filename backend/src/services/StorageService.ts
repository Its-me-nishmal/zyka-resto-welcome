import { Submission } from '../models/Submission.js';
import { Visit } from '../models/Visit.js';

export class StorageService {
    static async saveSubmission(data: any): Promise<any> {
        const submission = new Submission(data);
        return await submission.save();
    }

    static async recordVisit(data: { source: string; deviceId: string }): Promise<any> {
        const visit = new Visit(data);
        return await visit.save();
    }

    static async getAllSubmissions(query: any = {}): Promise<{ data: any[]; total: number }> {
        const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', filter = '' } = query;

        const filterQuery: any = {};
        if (filter) {
            filterQuery.$or = [
                { name: { $regex: filter, $options: 'i' } },
                { mobile: { $regex: filter, $options: 'i' } },
                { place: { $regex: filter, $options: 'i' } },
                { source: { $regex: filter, $options: 'i' } }
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);
        const sortOptions: any = { [sort]: order === 'desc' ? -1 : 1 };

        let dataPromise;
        if (Number(limit) === 0) {
            dataPromise = Submission.find(filterQuery).sort(sortOptions);
        } else {
            dataPromise = Submission.find(filterQuery).sort(sortOptions).skip(skip).limit(Number(limit));
        }

        const [data, total] = await Promise.all([
            dataPromise,
            Submission.countDocuments(filterQuery)
        ]);

        return { data, total };
    }

    static async getAnalytics(): Promise<any> {
        const [visitStats, submissionStats, questionStats] = await Promise.all([
            // Visit counts by source
            Visit.aggregate([
                { $group: { _id: '$source', count: { $sum: 1 } } }
            ]),
            // Submission counts by source
            Submission.aggregate([
                { $group: { _id: '$source', count: { $sum: 1 } } }
            ]),
            // Answer distribution
            Submission.aggregate([
                {
                    $group: {
                        _id: null,
                        favoriteFood: { $push: '$favoriteFood' },
                        visitTime: { $push: '$visitTime' },
                        companionType: { $push: '$companionType' }
                    }
                }
            ])
        ]);

        // Process source stats
        const sources = ['direct', 'whatsapp', 'qrcode_1', 'qrcode_2', 'qrcode_3', 'qrcode_4'];
        const sourceData = sources.map(src => ({
            name: src,
            visits: visitStats.find(v => v._id === src)?.count || 0,
            submissions: submissionStats.find(s => s._id === src)?.count || 0
        }));

        // Process question distributions
        const getDist = (arr: string[]) => {
            const dist: any = {};
            arr.forEach(val => { dist[val] = (dist[val] || 0) + 1; });
            return dist;
        };

        const analytics = {
            totalVisits: visitStats.reduce((acc, curr) => acc + curr.count, 0),
            totalSubmissions: submissionStats.reduce((acc, curr) => acc + curr.count, 0),
            sourceData,
            distributions: questionStats.length ? {
                favoriteFood: getDist(questionStats[0].favoriteFood),
                visitTime: getDist(questionStats[0].visitTime),
                companionType: getDist(questionStats[0].companionType)
            } : {}
        };

        return analytics;
    }
}
