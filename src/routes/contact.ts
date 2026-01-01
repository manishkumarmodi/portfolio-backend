import { randomUUID } from 'crypto';
import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../middleware/errorHandler';
import type { ContactMessage } from '../types/contact';

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  source: z.string().optional()
});

const messages: ContactMessage[] = [];

export const contactRouter = Router();

contactRouter.post('/', (req, res, next) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return next(new HttpError(400, 'Invalid payload.', parsed.error.flatten()));
  }

  const message: ContactMessage = {
    id: randomUUID(),
    ...parsed.data,
    createdAt: new Date().toISOString()
  };

  messages.push(message);

  res.status(201).json({
    message: 'Message received. We will reach back soon.',
    supportEmail: process.env.SUPPORT_EMAIL,
    ticketId: message.id
  });
});

contactRouter.get('/', (_req, res) => {
  res.json({ data: messages });
});
