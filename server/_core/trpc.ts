import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
  // An unexpected failure reached the browser with its own message, which for a
  // database error is the SQL statement and its parameters. Only errors thrown on
  // purpose carry their message out; anything else is logged and said plainly.
  errorFormatter({ shape, error }) {
    // A rejected input comes back as the first thing that is wrong with it, in words;
    // the raw validation report used to reach the page as JSON.
    if (error.code === "BAD_REQUEST" && (error.cause as any)?.issues?.length) {
      return { ...shape, message: String((error.cause as any).issues[0]?.message || "Please check what you entered.") };
    }
    const internal = error.code === "INTERNAL_SERVER_ERROR" && /Failed query|ER_[A-Z_]+|SQL|ECONN|ETIMEDOUT|drizzle/i.test(String(error.cause?.message ?? error.message));
    if (!internal) return shape;
    console.error("[tRPC] internal error:", error.cause ?? error);
    return { ...shape, message: "Something went wrong on our side. Please try again.", data: { ...shape.data, stack: undefined } };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);
