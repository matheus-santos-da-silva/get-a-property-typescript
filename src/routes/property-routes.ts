import { Router } from 'express';
import { PropertyController } from '../controllers/property-controller';
import { verifyToken } from '../middleware/verify-token';
import { imageUpload } from '../middleware/upload-images';
import { validationMiddleware } from '../middleware/validation';
import { createPropertyValidationSchema } from '../utils/properties-validation-schemas/create-property-validation';

const router = Router();

router.post(
  '/create',
  verifyToken,
  validationMiddleware(createPropertyValidationSchema),
  imageUpload.array('images'),
  PropertyController.create
);

router.get('/', PropertyController.getAllProperties);

export default router;