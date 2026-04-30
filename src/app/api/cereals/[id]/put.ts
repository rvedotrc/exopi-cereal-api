import { currentUser } from "@lib/auth";
import { CerealWithID, CerealWithoutID } from "@lib/schema/api/cereal";
import { decodeUnknownEither } from "effect/ParseResult";
import { isRight } from "effect/StreamHaltStrategy";
import { type NextRequest, NextResponse } from "next/server";
import { isValid } from "ulid";

import doUpdateOrNotFound from "../doUpdateOrNotFound";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const user = await currentUser(req);
  if (!user)
    return NextResponse.json(
      { error: "Authorization required" },
      { status: 401 },
    );

  const id = (await params).id;
  const body: unknown = await req.json();

  if (!isValid(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Un-REST
  const r1 = decodeUnknownEither(CerealWithoutID)(body);
  if (isRight(r1)) return doUpdateOrNotFound({ ...r1.right, id });

  const r2 = decodeUnknownEither(CerealWithID)(body);
  if (isRight(r2)) {
    if (r2.right.id.toLocaleUpperCase() !== id.toLocaleUpperCase()) {
      return NextResponse.json(
        { error: "ID in URL does not match ID in request content" },
        { status: 422 },
      );
    }

    return doUpdateOrNotFound(r2.right);
  }

  return NextResponse.json({ error: "Bad request" }, { status: 400 });
};
