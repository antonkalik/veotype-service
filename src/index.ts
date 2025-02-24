import * as dotenv from 'dotenv';
import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { router } from 'src/routes';
import { initialize } from 'src/initializers';
import { sendErrorMiddleware } from 'src/middlewares/sendErrorMiddleware';
import { sendDataMiddleware } from 'src/middlewares/sendDataMiddleware';
import { rateLimitMiddleware } from 'src/middlewares/rateLimitMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(sendErrorMiddleware);
app.use(sendDataMiddleware);
app.use(rateLimitMiddleware);
app.use('/api/v1', router);

(async () => {
  try {
    await initialize();
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
