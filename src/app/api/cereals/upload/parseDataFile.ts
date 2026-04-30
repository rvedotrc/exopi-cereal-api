import { type Either, left, right } from "effect/Either";

export const parseDataFile = (t: string): Either<object[], unknown> => {
  const rows = t
    .trimEnd()
    .split("\n")
    .map((line) => line.split(";"));

  if (!rows.every((row) => row.length === 16))
    return left(new Error("Input could not be parsed"));

  if (rows.length < 2) return left(new Error("Input could not be parsed"));

  const names = rows[0];

  const data = rows
    .slice(2)
    .map((cells) => [...cells.slice(0, 3), ...cells.slice(3).map(Number)]);

  const objects = data.map((cells) =>
    cells
      .map((d, i) => [d, i] as const)
      .reduce((acc, [d, i]) => {
        acc[names[i]] = d;
        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as any),
  );

  return right(objects);
};
