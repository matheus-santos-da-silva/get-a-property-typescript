import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { validationMiddleware } from '../middleware/validation';
import { createUserValidationSchema } from '../utils/users-validation-schemas/create-user-validation';
import { LoginUserValidationSchema } from '../utils/users-validation-schemas/login-user-validation';

const router = Router();

router.post('/register', validationMiddleware(createUserValidationSchema), UserController.register);
router.post('/login', validationMiddleware(LoginUserValidationSchema), UserController.login);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);

export default router;