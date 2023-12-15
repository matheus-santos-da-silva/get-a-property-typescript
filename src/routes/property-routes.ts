import { Router } from 'express';
import { PropertyController } from '../controllers/property-controller';
import { verifyToken } from '../middleware/verify-token';
import { imageUpload } from '../middleware/upload-images';

const router = Router();

router.post(
  '/create',
  verifyToken,
  imageUpload.array('images'),
  PropertyController.create
);

router.get('/', PropertyController.getAllProperties);
router.get('/myproperties/:id', verifyToken, PropertyController.getUserProperties);
router.get('/:id', PropertyController.GetPropertyById);
router.patch('/schedule/:id', verifyToken, PropertyController.Schedule);

export default router;