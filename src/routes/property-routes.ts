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
router.patch('/schedule/:id', verifyToken, PropertyController.Schedule);
router.get('/mynegotiations', verifyToken, PropertyController.getMyNegotiations);
router.get('/:id', PropertyController.GetPropertyById);
router.delete('/conclude/:id', verifyToken, PropertyController.ConcludeNegotiation);
router.patch('/edit/:id', verifyToken, imageUpload.array('images') ,PropertyController.editProperty);
router.delete('/:id', verifyToken, PropertyController.deleteProperty);

export default router;