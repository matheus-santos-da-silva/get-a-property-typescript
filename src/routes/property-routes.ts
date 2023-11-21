import { Router } from 'express';
import { PropertyController } from '../controllers/property-controller';
import { verifyToken } from '../middleware/verify-token';
import { imageUpload } from '../middleware/upload-images';

const router = Router();

router.post('/create', verifyToken, imageUpload.array('images'), PropertyController.create);

export default router;