import type { Request, Response } from 'express';
import { StorageService } from '../services/StorageService.js';
import { ExportService } from '../services/ExportService.js';

export class AdminController {
    static async getSubmissions(req: Request, res: Response) {
        try {
            const { page, limit, sort, order, filter } = req.query;
            const result = await StorageService.getAllSubmissions({ page, limit, sort, order, filter });
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching submissions' });
        }
    }

    static async getStats(req: Request, res: Response) {
        try {
            const stats = await StorageService.getAnalytics();
            res.json(stats);
        } catch (error) {
            console.error('Stats error:', error);
            res.status(500).json({ message: 'Error fetching statistics' });
        }
    }

    static async exportExcel(req: Request, res: Response) {
        try {
            const result = await StorageService.getAllSubmissions({ limit: 0 });
            const buffer = await ExportService.generateExcel(result.data);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=submissions.xlsx');
            res.send(buffer);
        } catch (error) {
            res.status(500).json({ message: 'Error exporting Excel' });
        }
    }

    static async exportPDF(req: Request, res: Response) {
        try {
            const result = await StorageService.getAllSubmissions({ limit: 0 });
            const buffer = await ExportService.generatePDF(result.data);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=submissions.pdf');
            res.send(buffer);
        } catch (error) {
            res.status(500).json({ message: 'Error exporting PDF' });
        }
    }
}
