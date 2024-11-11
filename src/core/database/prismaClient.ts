import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

const prismaClientSingleton = () => {
  const neon = new Pool({
    connectionString: process.env.DATABASE_PRISMA_URL,
  });
  const adapter = new PrismaNeon(neon);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (
  ["production", "vercel-production"].includes(process.env.VERCEL_ENV as string)
)
  globalThis.prismaGlobal = prisma;
