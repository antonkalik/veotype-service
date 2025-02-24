import { rateLimit } from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  legacyHeaders: false,
  standardHeaders: 'draft-8',
});
