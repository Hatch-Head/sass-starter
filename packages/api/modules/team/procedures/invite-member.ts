import { TRPCError } from "@trpc/server";
import { db } from "database";
import { sendEmail } from "mail";
import { z } from "zod";
import { defineAbilitiesFor } from "../../auth";
import { getBaseUrl } from "../../shared";
import { protectedProcedure } from "../../trpc";

export const inviteMember = protectedProcedure
  .input(
    z.object({
      teamId: z.string(),
      email: z.string(),
      role: z.enum(["MEMBER", "OWNER"]),
    }),
  )
  .mutation(async ({ input: { teamId, email, role }, ctx: { user } }) => {
    const abilities = await defineAbilitiesFor({
      userId: user!.id,
      teamId,
    });

    if (!abilities.can("create", "TeamInvitation")) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No permission to add a member to this team.",
      });
    }

    try {
      const invitation = await db.teamInvitation.create({
        data: {
          teamId,
          email,
          role,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        },
        include: {
          team: {
            select: {
              name: true,
            },
          },
        },
      });

      // get user

      await sendEmail({
        templateId: "teamInvitation",
        to: email,
        context: {
          url: `${getBaseUrl()}/auth/signup?invitationCode=${invitation.id}`,
          teamName: invitation.team.name,
        },
      });
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not create membership.",
      });
    }
  });