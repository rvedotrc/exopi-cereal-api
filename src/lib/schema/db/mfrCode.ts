export const MFR_NAMES = {
  A: "American Home Food Products",
  G: "General Mills",
  K: "Kelloggs",
  N: "Nabisco",
  P: "Post",
  Q: "Quaker Oats",
  R: "Ralston Purina",
} as const;

export type MfrCode = keyof typeof MFR_NAMES;

export const MFR_CODES = [...Object.keys(MFR_NAMES)] as readonly MfrCode[];
