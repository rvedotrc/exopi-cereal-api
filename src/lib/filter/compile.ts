import assert from "assert";
import { ulid } from "ulid";
import { inspect } from "util";

import { BINARY_OPERATORS_TO_SQL } from "./binaryOperators";
import { checkField } from "./checkField";
import {
  type FilterNode,
  isAnd,
  isBinaryOperation,
  isNot,
  isOr,
  isUnaryOperation,
} from "./types";

export type Compiled =
  | {
      readonly q: string;
      readonly a: NodeJS.Dict<string | number | boolean>;
    }
  | boolean;

const compileAndOr = (
  children: readonly FilterNode[],
  base: boolean,
  poison: boolean,
  joiner: string,
) => {
  const compiled = children.map(compileFilter);
  if (compiled.includes(poison)) return poison;

  const unknowns = compiled.filter((t) => typeof t !== "boolean");
  if (unknowns.length === 0) return base;

  return {
    q: unknowns.map((c) => `(${c.q})`).join(joiner),
    a: unknowns.reduce(
      (acc, item) => ({
        ...acc,
        ...item.a,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any,
    ),
  };
};

export const compileFilter = (filterNode: FilterNode): Compiled => {
  if (isAnd(filterNode)) {
    return compileAndOr(filterNode.and, true, false, " AND ");
  } else if (isOr(filterNode)) {
    return compileAndOr(filterNode.or, false, true, " OR ");
  } else if (isNot(filterNode)) {
    const compiled = compileFilter(filterNode.not);

    if (typeof compiled === "boolean") return !compiled;

    return {
      q: `NOT (${compiled.q})`,
      a: compiled.a,
    };
  } else if (isBinaryOperation(filterNode)) {
    const column = checkField(filterNode.b[0]);
    const sqlOperator = BINARY_OPERATORS_TO_SQL[filterNode.b[1]];
    assert(sqlOperator);

    const param = `p${ulid()}`;

    return {
      q: `${column} ${sqlOperator} :${param}`,
      a: { [param]: filterNode.b[2] },
    };
  } else if (isUnaryOperation(filterNode)) {
    const column = checkField(filterNode.u[0]);
    return { q: `${column} IS NULL`, a: {} };
  }

  throw new Error(`Unknown FilterNode: ${inspect(filterNode, { depth: 2 })}`);
};
