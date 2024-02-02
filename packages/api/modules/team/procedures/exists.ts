import { db } from "database";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const exists = protectedProcedure
    .input(
        z.object({
            slug: z.string(),
        }),
    )
    .query(async ({ input: { slug } }) => {
        const team = await db.team.findFirst({
            where: {
                slug,
            },
        });

        return team ? true : false;
    });
