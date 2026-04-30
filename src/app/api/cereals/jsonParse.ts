import { protoSafeParse } from "@blaahaj/json";
import { type Either, left, right } from "effect/Either";

export const jsonParse = (s: string): Either<unknown, unknown> => {
  try {
    return right(protoSafeParse(s));
  } catch (e: unknown) {
    return left(e);
  }
};
