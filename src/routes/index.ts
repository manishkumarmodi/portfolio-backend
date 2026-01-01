import { Router } from 'express';

import { contactRouter } from './contact';

export const apiRouter = Router();

apiRouter.use('/contact', contactRouter);
