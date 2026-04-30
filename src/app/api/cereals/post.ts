import { currentUser } from "@lib/auth";
import { CerealWithID, CerealWithoutID } from "@lib/schema/api/cereal";
import { decodeUnknownEither } from "effect/ParseResult";
import { isRight } from "effect/StreamHaltStrategy";
import { NextRequest, NextResponse } from "next/server";

import doCreate from "./doCreate";
import doUpdateOrNotFound from "./doUpdateOrNotFound";

export const POST = async (req: NextRequest) => {
  const user = await currentUser(req);
  if (!user)
    return NextResponse.json(
      { error: "Authorization required" },
      { status: 401 },
    );

  const body: unknown = await req.json();

  const r1 = decodeUnknownEither(CerealWithoutID)(body);
  if (isRight(r1)) return doCreate(r1.right);

  // Un-REST
  const r2 = decodeUnknownEither(CerealWithID)(body);
  if (isRight(r2)) return doUpdateOrNotFound(r2.right);

  return NextResponse.json({ error: "Bad request" }, { status: 400 });
};
