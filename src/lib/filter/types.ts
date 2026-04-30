import type { BinaryOperator } from "./binaryOperators";

export type FilterNode = And | Or | Not | LeafNode;

/**
 * False iff there is at least one filter node which evaluates to false.
 */
export type And = { readonly and: readonly FilterNode[] };

/**
 * True iff there is at least one filter node which evaluates to true.
 */
export type Or = { readonly or: readonly FilterNode[] };

/**
 * True iff the given filter node is false
 * e.g.: {"not":{"u":["weight","isnull"]}}
 * which means: NOT(weight is null); also known as: weight is not null.
 */
export type Not = { readonly not: FilterNode };

export type LeafNode = BinaryOperation | UnaryOperation;

/**
 * True iff the field named by the first `string` compares (using the BinaryOperator) against the value in the second string.
 * e.g.: {"b":["shelf","ge","2"]} (which means: shelf >= 2).
 */
export type BinaryOperation = {
  readonly b: readonly [string, BinaryOperator, string];
};

/**
 * True iff the field named by the `string` is null
 * e.g.: {"u":["weight","isnull"]}
 */
export type UnaryOperation = { readonly u: readonly [string, "isnull"] };

export const isAnd = (f: FilterNode): f is And => "and" in f;
export const isOr = (f: FilterNode): f is Or => "or" in f;
export const isNot = (f: FilterNode): f is Not => "not" in f;
export const isBinaryOperation = (f: FilterNode): f is BinaryOperation =>
  "b" in f;
export const isUnaryOperation = (f: FilterNode): f is UnaryOperation =>
  "u" in f;
