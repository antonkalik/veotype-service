import { Router } from 'express';
import { updateUserController } from 'src/controllers/user/updateUserController';
import { deleteUserController } from 'src/controllers/user/deleteUserController';
import { logoutController } from 'src/controllers/user/logoutController';
import { updatePasswordController } from 'src/controllers/user/updatePasswordController';
import { createSignUpLinkController } from 'src/controllers/user/createSignUpLinkController';
import { settingsController } from 'src/controllers/user/settingsController';

export const userRouter = Router();

userRouter.patch('/', updateUserController);
userRouter.delete('/', deleteUserController);
userRouter.post('/logout', logoutController);
userRouter.post('/update-password', updatePasswordController);
userRouter.post('/create-signup-link', createSignUpLinkController);
userRouter.get('/settings', settingsController);
