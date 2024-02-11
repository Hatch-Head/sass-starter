import { test as setup } from '@playwright/test';
import { Prisma, db } from 'database';

setup('Seed', async () => {

    // Create users
    await db.$executeRaw(Prisma.sql`DELETE FROM "public"."User";`)
    await db.$executeRaw(Prisma.sql`
    INSERT INTO "public"."User" ("id", "email", "email_verified", "role", "name", "avatar_url", "github_username") VALUES
        ('5jjt0yet88ugopx', 'andrew@hatchhead.co', 'f', 'USER', 'Andrew Morton', NULL, NULL);
    `)
    await db.$executeRaw(Prisma.sql`INSERT INTO "public"."UserKey" ("id", "hashed_password", "user_id") VALUES
    ('email:andrew@hatchhead.co', 's2:31d1uqeqxqztcle4:389033e4ca8ee863d69f2ed3373085604a2cdc26063c92b7ec23578449ba09b11146894f74ede84756354d7b2c3e9fcc1e974c269942aebcaef7ae57ceb760aa', '5jjt0yet88ugopx');`)

    // Create teams
    await db.$executeRaw(Prisma.sql`DELETE FROM "public"."Team";`)
    await db.$executeRaw(Prisma.sql`INSERT INTO "public"."Team" ("id", "name", "slug") VALUES
    ('clsdu5gj8000ct9je4r6d7te4', 'Hatch Head', 'hatch-head');`)
    await db.$executeRaw(Prisma.sql`INSERT INTO "public"."TeamMembership" ("id", "team_id", "user_id", "role", "is_creator") VALUES
    ('clsdu5gj9000et9je1iyjdyi8', 'clsdu5gj8000ct9je4r6d7te4', '5jjt0yet88ugopx', 'OWNER', 't');
    `)


});
