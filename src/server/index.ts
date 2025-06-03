import { publicProcedure, router } from './trpc';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { z } from "zod";

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}!`,
      };
    }),
});
export type AppRouter = typeof appRouter;

export const serverHelper = createServerSideHelpers({
  router: appRouter,
  ctx: {},
  transformer: superjson
});