import * as s from "effect/Schema";

import { BinaryOperators } from "./binaryOperators";
import type {
  And,
  BinaryOperation,
  LeafNode,
  Not,
  Or,
  UnaryOperation,
} from "./types";

export const FilterNode = s.Union(
  s.suspend((): s.Schema<And> => And),
  s.suspend((): s.Schema<Or> => Or),
  s.suspend((): s.Schema<Not> => Not),
  s.suspend((): s.Schema<LeafNode> => LeafNode),
);

const And = s
  .Struct({
    and: s.Array(FilterNode),
  })
  .annotations({ parseOptions: { onExcessProperty: "error" } });

const Or = s
  .Struct({
    or: s.Array(FilterNode),
  })
  .annotations({ parseOptions: { onExcessProperty: "error" } });

const Not = s
  .Struct({
    not: FilterNode,
  })
  .annotations({ parseOptions: { onExcessProperty: "error" } });

const LeafNode = s.Union(
  s.suspend((): s.Schema<BinaryOperation> => BinaryOperation),
  s.suspend((): s.Schema<UnaryOperation> => UnaryOperation),
);

const BinaryOperation = s
  .Struct({
    b: s.Tuple(s.String, s.Literal(...BinaryOperators), s.String),
  })
  .annotations({ parseOptions: { onExcessProperty: "error" } });

const UnaryOperation = s
  .Struct({
    u: s.Tuple(s.String, s.Literal("isnull")),
  })
  .annotations({ parseOptions: { onExcessProperty: "error" } });
