import { currentUser } from "@lib/auth";
import AppDataSource from "@lib/dataSource";
import { CerealsWithoutID, type CerealWithID } from "@lib/schema/api/cereal";
import { Cereal } from "@lib/schema/db/cereal";
import { isLeft } from "effect/Either";
import { flatMap } from "effect/Either";
import { decodeUnknownEither } from "effect/Schema";
import { type NextRequest, NextResponse } from "next/server";
import { ulid } from "ulid";

import { parseDataFile } from "./parseDataFile";

export const POST = async (req: NextRequest) => {
  const user = await currentUser(req);
  if (!user)
    return NextResponse.json(
      { error: "Authorization required" },
      { status: 401 },
    );

  const t = await req.text();
  const r = flatMap(parseDataFile(t), decodeUnknownEither(CerealsWithoutID));

  if (isLeft(r)) {
    return NextResponse.json(
      {
        error: r.left instanceof Error ? r.left.message : String(r.left),
      },
      { status: 400 },
    );
  }

  const toInsert = r.right.map(
    (v): CerealWithID => ({
      id: ulid(),
      ...v,
    }),
  );

  await AppDataSource.manager.transaction(async (em) => {
    em.insert(Cereal, toInsert);
  });

  return NextResponse.json({ ids: toInsert.map((t) => t.id) });
};
