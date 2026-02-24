import { StorageService } from '../services/StorageService.js';
import { ExportService } from '../services/ExportService.js';
export class AdminController {
    static async getSubmissions(req, res) {
        try {
            const submissions = await StorageService.getAllSubmissions();
            res.json(submissions);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching submissions' });
        }
    }
    static async exportExcel(req, res) {
        try {
            const data = await StorageService.getAllSubmissions();
            const buffer = await ExportService.generateExcel(data);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=submissions.xlsx');
            res.send(buffer);
        }
        catch (error) {
            res.status(500).json({ message: 'Error exporting Excel' });
        }
    }
    static async exportPDF(req, res) {
        try {
            const data = await StorageService.getAllSubmissions();
            const buffer = await ExportService.generatePDF(data);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=submissions.pdf');
            res.send(buffer);
        }
        catch (error) {
            res.status(500).json({ message: 'Error exporting PDF' });
        }
    }
}
//# sourceMappingURL=AdminController.js.map