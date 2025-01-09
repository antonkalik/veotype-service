import { Router } from 'express';
import { authRouter } from 'src/routes/authRouter';
import { updateUserController } from 'src/controllers/user/updateUserController';
import { deleteUserController } from 'src/controllers/user/deleteUserController';
import { logoutController } from 'src/controllers/user/logoutController';
import { updatePasswordController } from 'src/controllers/user/updatePasswordController';
import { createSignUpLinkController } from 'src/controllers/user/createSignUpLinkController';

export const userRouter = Router();

userRouter.patch('/', updateUserController);
userRouter.delete('/', deleteUserController);
userRouter.post('/logout', logoutController);
userRouter.post('/update-password', updatePasswordController);
authRouter.post('/create-signup-link', createSignUpLinkController);
authRouter.get('/settings', (req, res) => {
  res.json({
    theme: 'Brown',
  });
});
