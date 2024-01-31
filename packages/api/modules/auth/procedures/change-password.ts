import { TRPCError } from "@trpc/server";
import { auth } from "auth";
import { sendEmail } from "mail";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const changePassword = protectedProcedure
  .input(
    z.object({
      currentPassword: z.string().min(8).max(255),
      newPassword: z.string().min(8).max(255),
    }),
  )
  .mutation(async ({ ctx: { user }, input: { currentPassword, newPassword } }) => {
    const isValid = await auth.useKey("email", user.email, currentPassword);

    if (isValid) {
      await auth.updateKeyPassword("email", user!.email, newPassword);
      await sendEmail({
        templateId: "passwordChange",
        to: user.email,
        context: {
          name: user.name ?? user.email,
        },
      });
    } else {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Incorrect password.",
      });
    }
  });
