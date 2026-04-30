import type { NextRequest } from "next/server";
import { LessThanOrEqual } from "typeorm";

// import * as c from "node:crypto";
import AppDataSource from "./dataSource";
import { APIKey } from "./schema/db/apiKey";
import { User } from "./schema/db/user";

// export const generateApiKey = async (): Promise<string> => {
//   const random = c.randomBytes(20);
//   return `xcak_${random.toHex().toLocaleLowerCase()}`;
// };

export const currentUser = async (req: NextRequest): Promise<User | null> => {
  const header = req.headers.get("Authorization") ?? "";
  const match = header.match(/^Bearer (xcak_[0-9a-f]{40})$/);
  const apiKeyText = match?.[1];
  if (!apiKeyText) return null;

  const now = new Date().toISOString();

  const apiKey = await AppDataSource.manager.findOne(APIKey, {
    where: {
      api_key: apiKeyText,
      expires: LessThanOrEqual(now),
    },
    relations: {
      user: true,
    },
  });

  return apiKey?.user ?? null;
};
