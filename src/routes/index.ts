import { Router } from 'express';
import { authRouter } from 'src/routes/authRouter';
import { healthController } from 'src/controllers/healthController';
import { sessionController } from 'src/controllers/sessionController';
import { authMiddleware } from 'src/middlewares/authMiddleware';
import { userRouter } from 'src/routes/userRouter';
import { forgotPasswordRouter } from 'src/routes/forgotPasswordRouter';
import { constrainsController } from 'src/controllers/constrainsController';

export const router = Router({ mergeParams: true });

router.get('/health', healthController);
router.get('/constrains', constrainsController);
router.use('/forgot-password', forgotPasswordRouter);
router.use('/auth', authRouter);
router.get('/session', authMiddleware, sessionController);
router.use('/user', authMiddleware, userRouter);

router.use((_, res) => {
  return res.sendStatus(404);
});
