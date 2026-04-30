import AppDataSource from "@lib/dataSource";
import { Cereal } from "@lib/schema/db/cereal";
import { isLeft } from "effect/Either";
import { type NextRequest, NextResponse } from "next/server";

import { getOrder } from "./order";
import { getWhere } from "./where";

export const GET = async (req: NextRequest) => {
  const search = new URL(req.url).searchParams;

  const orderOrError = getOrder(search.get("sort"));
  if (isLeft(orderOrError)) return orderOrError.left;

  const whereOrError = getWhere(search.get("filter"));
  if (isLeft(whereOrError)) return whereOrError.left;

  let queryBuilder = AppDataSource.getRepository(Cereal).createQueryBuilder();

  if (whereOrError.right !== undefined) {
    if (whereOrError.right === false) return NextResponse.json({ cereals: [] });

    if (whereOrError.right !== true) {
      queryBuilder = queryBuilder.where(
        whereOrError.right.q,
        whereOrError.right.a,
      );
    }
  }

  for (const [k, v] of Object.entries(orderOrError.right)) {
    queryBuilder = queryBuilder.addOrderBy(k, v === "ASC" ? "ASC" : "DESC");
  }

  return await queryBuilder
    .getMany()
    .then((cereals) => NextResponse.json({ cereals }));
};
