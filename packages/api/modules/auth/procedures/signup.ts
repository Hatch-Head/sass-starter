import { TRPCError } from "@trpc/server";
import { auth, generateOneTimePassword, generateVerificationToken } from "auth";
import { TeamInvitation, UserRole, db } from "database";
import { sendEmail } from "mail";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const signup = publicProcedure
  .input(
    z.object({
      email: z
        .string()
        .email()
        .min(1)
        .max(255)
        .transform((v) => v.toLowerCase()),
      password: z.string().min(8).max(255),
      invitationCode: z.string().optional(),
      name: z.string().min(1).max(255),
      callbackUrl: z.string(),
    }),
  )
  .mutation(
    async ({
      input: { email, password, name, callbackUrl, invitationCode },
      ctx: { responseHeaders },
    }) => {
      try {


        // Check if this came from an invitation
        let invitation: TeamInvitation | null = null;
        if (invitationCode) {
          invitation = await db.teamInvitation.findUnique({
            where: {
              id: invitationCode,
            },
          });
          if (!invitation) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invitation not found.",
            });
          }
          if (invitation.expiresAt.getTime() < new Date().getTime()) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invitation expired.",
            });
          }
        }

        const requireVerification = invitation === null || invitation.email !== email;

        if (requireVerification) {

          const user = await auth.createUser({
            key: {
              providerId: "email",
              providerUserId: email,
              password,
            },
            attributes: {
              email: email,
              email_verified: false,
              name,
              role: UserRole.USER,
              avatar_url: null,
            },
          });

          const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
          });

          // auth.handleRequest(req);
          const sessionCookie = auth.createSessionCookie(session);
          responseHeaders?.append("Set-Cookie", sessionCookie.serialize());

          const token = await generateVerificationToken({
            userId: user.userId,
          });
          const otp = await generateOneTimePassword({
            userId: user.userId,
            type: "SIGNUP",
            identifier: email,
          });

          const url = new URL(callbackUrl);
          url.searchParams.set("token", token);

          await sendEmail({
            templateId: "newUser",
            to: email,
            context: {
              url: url.toString().replace("127.0.0.1", "localhost"),
              otp,
              name: user.name ?? user.email,
            },
          });
        }
        else {

          // Should not get here but for type safety
          if (invitation === null) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invitation not found.",
            });
          }

          /**
           * User came from an invite, so we don't need to verify their email
           */
          const user = await auth.createUser({
            key: {
              providerId: "email",
              providerUserId: email,
              password,
            },
            attributes: {
              email: email,
              email_verified: true,
              name,
              role: UserRole.USER,
              avatar_url: null,
            },
          });


          await db.teamMembership.create({
            data: {
              team_id: invitation.team_id,
              user_id: user!.id,
              role: invitation.role,
            },
            include: {
              team: {
                select: {
                  slug: true,
                },
              },
            },
          });

          // delete invitation
          await db.teamInvitation.delete({
            where: {
              id: invitation.id,
            },
          });


        }
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unknown error occurred.",
        });
      }
    },
  );
