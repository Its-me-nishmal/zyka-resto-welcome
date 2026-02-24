import * as XLSX from 'xlsx';
import PDFDocument from 'pdfkit';

export class ExportService {
    static async generateExcel(data: any[]): Promise<Buffer> {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
        return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    }

    static async generatePDF(data: any[]): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const buffers: Buffer[] = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', reject);

            doc.fontSize(20).text('ZYKA Submissions Report', { align: 'center' });
            doc.moveDown();

            data.forEach((item, index) => {
                doc.fontSize(12).text(`${index + 1}. ${item.name} - ${item.mobile} (${item.place})`);
                doc.fontSize(10).text(`Reward: ${item.reward} | Time: ${item.createdAt}`);
                doc.moveDown(0.5);
            });

            doc.end();
        });
    }
}
