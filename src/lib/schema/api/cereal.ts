import * as s from "effect/Schema";

import { CerealTypes } from "../db/cerealType";
import { MFR_CODES } from "../db/mfrCode";

export const IDSchema = s.ULID;
export type IDType = (typeof IDSchema)["Type"];

export const CerealWithoutID = s
  .Struct({
    name: s.String,
    mfr: s.Literal(...MFR_CODES),
    type: s.Literal(...CerealTypes),
    calories: s.Int,
    protein: s.Int,
    fat: s.Int,
    sodium: s.Int,
    fiber: s.Number,
    carbo: s.Number,
    sugars: s.Int,
    potass: s.Int,
    vitamins: s.Int,
    shelf: s.Int,
    weight: s.Number,
    cups: s.Number,
    rating: s.Number,
  })
  .annotations({ parseOptions: { onExcessProperty: "error" } });
export type CerealWithoutID = (typeof CerealWithoutID)["Type"];

export const CerealWithID = s
  .Struct({
    id: IDSchema,
    ...CerealWithoutID.fields,
  })
  .annotations({ parseOptions: { onExcessProperty: "error" } });
export type CerealWithID = (typeof CerealWithID)["Type"];

export const CerealsWithoutID = s.Array(CerealWithoutID);
export type CerealsWithoutID = (typeof CerealsWithoutID)["Type"];
