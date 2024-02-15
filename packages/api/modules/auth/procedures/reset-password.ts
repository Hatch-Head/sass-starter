import { TRPCError } from "@trpc/server";
import { auth, validateVerificationToken } from "auth";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const resetPassword = publicProcedure
    .input(
        z.object({
            newPassword: z.string().min(8).max(255),
            confirmPassword: z.string().min(8).max(255),
            token: z.string().min(1),
        }),
    )
    .mutation(async ({ ctx: { responseHeaders }, input: { newPassword, confirmPassword, token } }) => {

        if (newPassword !== confirmPassword) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Passwords do not match.",
            });
        }

        try {

            const userId = await validateVerificationToken({
                token,
            });

            if (!userId) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invalid token",
                });
            }

            const user = await auth.getUser(userId)

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            await auth.updateKeyPassword("email", user!.email, newPassword);

            const session = await auth.createSession({
                userId: userId,
                attributes: {},
            });

            // auth.handleRequest(req);
            const sessionCookie = auth.createSessionCookie(session);
            responseHeaders?.append("Set-Cookie", sessionCookie.serialize());

            return session;

        } catch (e: any) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: e.message || "Something went wrong",
            });
        }
    });
