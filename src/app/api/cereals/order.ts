import AppDataSource from "@lib/dataSource";
import { Cereal } from "@lib/schema/db/cereal";
import type { Either } from "effect/Either";
import { left, right } from "effect/Either";
import { NextResponse } from "next/server";
import type { FindOptionsOrder } from "typeorm";

export const getOrder = (
  spec: string | null | undefined,
): Either<FindOptionsOrder<Cereal>, NextResponse> => {
  const sort = (spec ?? "").split(/,/g).filter(Boolean);
  const order: FindOptionsOrder<Cereal> = {};
  const fields = AppDataSource.entityMetadatasMap
    .get(Cereal)!
    .columns.map((c) => c.databaseNameWithoutPrefixes);

  for (const term of sort) {
    const name = term.replace(/^-/, "");
    if (fields.includes(name)) {
      order[name as keyof typeof order] = term.startsWith("-") ? "DESC" : "ASC";
    } else {
      return left(
        NextResponse.json({ error: "Bad sort field", term }, { status: 400 }),
      );
    }
  }

  if (!order.id) order.id = "ASC";

  return right(order);
};
