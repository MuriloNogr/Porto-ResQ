import { z } from "zod";

export const createPostSchema = z.object({ text: z.string().min(3) });
