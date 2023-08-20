import { z } from 'zod';

export const zPollTypeSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  options: z.array(z.string()),
  createdAt: z.date().optional(),
  isLive: z.boolean().optional(),
});

export const zPollersSchema = z.object({
  pollId: z.string(),
  IPAdress: z.string(),
  pollOption: z.number(),
});

export const zOptionsCountSchema = z.object({
  pollId: z.string(),
  pollOption: z.string(),
  count: z.number(),
});

