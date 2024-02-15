import { db } from "database";

const user = require("../../../db/user.json");

const ALLOWED_ENVIRONMENTS = ["development", "test"];

async function main() {
  if (!ALLOWED_ENVIRONMENTS.includes(process.env.NODE_ENV || "")) {
    throw new Error(
      `Cannot run seed in ${process.env.NODE_ENV || ""} environment`,
    );
  }

  // Delete old users
  await db.user.deleteMany({
    where: {
      id: {

        in: user.map((u) => u.id),
      },
    },
  });
  // Create users
  await db.user.createMany({
    data: user,
  });
}

