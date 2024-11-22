import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient;
}

export const prismaClient: PrismaClient =
  global.prismaClient ||
  new PrismaClient({
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") global.prismaClient = prismaClient;
