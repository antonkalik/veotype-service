import { Router } from 'express';
import { signUpController } from 'src/controllers/auth/signUpController';
import { loginController } from 'src/controllers/auth/loginController';
import { signUpTokenController } from 'src/controllers/auth/signUpTokenController';

export const authRouter = Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signup/:token', signUpTokenController);
authRouter.post('/login', loginController);
