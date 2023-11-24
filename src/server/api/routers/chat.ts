import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { questions, options } from "@/server/db/schema";

export const chatRouter = createTRPCRouter({
  initialize: publicProcedure.query(async ({ ctx }) => {
    const a = await ctx.db.query.questions.findFirst({
      where: eq(questions.id, 1),
    });

    const aggregate: {
      question: string;
      options: string[];
    } = {
      question: a?.question_text ?? "",
      options: [],
    };

    return aggregate;
  }),
});
