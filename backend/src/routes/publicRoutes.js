import { Router } from 'express';
import { SubmissionController } from '../controllers/SubmissionController.js';
const router = Router();
router.post('/submit', SubmissionController.submit);
router.get('/rewards', SubmissionController.getRewards);
export default router;
//# sourceMappingURL=publicRoutes.js.map