import { Router } from 'express';
import { AdminController } from '../controllers/AdminController.js';
import { adminAuth } from '../middleware/adminAuth.js';
const router = Router();
router.use(adminAuth);
router.get('/submissions', AdminController.getSubmissions);
router.get('/export/excel', AdminController.exportExcel);
router.get('/export/pdf', AdminController.exportPDF);
export default router;
//# sourceMappingURL=adminRoutes.js.map