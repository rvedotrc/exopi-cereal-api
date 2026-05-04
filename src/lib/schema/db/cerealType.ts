export const CEREAL_TYPE_NAMES = {
  H: "Hot",
  C: "Cold",
} as const;

export type CerealType = keyof typeof CEREAL_TYPE_NAMES;

export const CEREAL_TYPES = [
  ...Object.keys(CEREAL_TYPE_NAMES),
] as readonly CerealType[];
