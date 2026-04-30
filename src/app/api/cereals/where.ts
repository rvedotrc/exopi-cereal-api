import { FilterNode } from "@lib/filter/schema";
import { type Either, flatMap, map, mapLeft, right } from "effect/Either";
import { pipe } from "effect/Function";
import { decodeUnknownEither } from "effect/Schema";
import { NextResponse } from "next/server";

import { type Compiled, compileFilter } from "../../../lib/filter/compile";
import { jsonParse } from "./jsonParse";

export const getWhere = (
  spec: string | null | undefined,
): Either<Compiled | undefined, NextResponse> => {
  if (!spec) return right(undefined);

  return pipe(
    spec,
    jsonParse,
    flatMap(decodeUnknownEither(FilterNode)),
    mapLeft(() =>
      NextResponse.json({ error: "Invalid filter" }, { status: 400 }),
    ),
    map(compileFilter),
  );
};
