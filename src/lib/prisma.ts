import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL || 'file:./dev.db';

  // On Vercel / AWS Lambda with SQLite, copy dev.db to /tmp so database writes succeed
  if (envUrl.startsWith('file:') && (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)) {
    try {
      const rootDbPath = path.join(process.cwd(), 'prisma', 'dev.db');
      const tmpDbPath = '/tmp/dev.db';

      if (fs.existsSync(rootDbPath) && !fs.existsSync(tmpDbPath)) {
        fs.copyFileSync(rootDbPath, tmpDbPath);
      }
      return 'file:/tmp/dev.db';
    } catch (err) {
      console.error('Failed to setup /tmp SQLite DB for Vercel:', err);
    }
  }

  return envUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const dbUrl = getDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
