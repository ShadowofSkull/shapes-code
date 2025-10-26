import { z } from 'zod';

// Shape validation schema - cleanest approach
export const shapeSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less')
    .trim(),
  color: z.enum(['red', 'blue', 'green', 'yellow']),
  shape: z.enum(['circle', 'square', 'triangle']),
});

// Login validation schema
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// Type exports
export type ShapeInput = z.infer<typeof shapeSchema>;
export type LoginInput = z.infer<typeof loginSchema>;