import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { validationMiddleware } from '../middleware/validation';
import { createUserValidationSchema } from '../utils/users-validation-schemas/create-user-validation';
import { LoginUserValidationSchema } from '../utils/users-validation-schemas/login-user-validation';
import { verifyToken } from '../middleware/verify-token';

const router = Router();

router.post('/register', validationMiddleware(createUserValidationSchema), UserController.register);
router.post('/login', validationMiddleware(LoginUserValidationSchema), UserController.login);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.patch('/edit/:id', verifyToken, validationMiddleware(createUserValidationSchema), UserController.editUser);

export default router;