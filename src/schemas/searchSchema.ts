import { z } from 'zod';

export const searchSchema = z.object({
  query: z
    .string()
    .max(60, 'Search is too long.')
    .transform((value: string) => value.trimStart()),
});

export type SearchSchema = z.input<typeof searchSchema>;
