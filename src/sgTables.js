// Public PGA Tour / Broadie-style putting anchors.
// These are benchmark expected strokes to hole out from on the green.
// The complete Tour table is proprietary; this is a public-anchor approximation.

export const puttTable = {
  1: 1.00,
  2: 1.01,
  3: 1.05,
  4: 1.14,
  5: 1.24,
  6: 1.34,
  7: 1.43,
  8: 1.50,
  9: 1.56,
  10: 1.61,
  12: 1.69,
  15: 1.78,
  20: 1.87,
  25: 1.93,
  30: 1.98,
  35: 2.02,
  40: 2.06,
  50: 2.14,
  60: 2.21,
  75: 2.29,
  90: 2.36
};

// PGA Tour-style around-the-green anchor values.
// These are reconstructed public-style anchors, not an official Tour export.
// Fringe is separated slightly from fairway for realism.

export const shortGamePga = {
  fringe: {
    1: 1.98,
    3: 2.01,
    5: 2.05,
    7: 2.11,
    10: 2.18,
    15: 2.28,
    20: 2.37,
    25: 2.44,
    30: 2.49,
    35: 2.55,
    40: 2.61,
    45: 2.67,
    50: 2.73
  },
  fairway: {
    1: 2.00,
    3: 2.03,
    5: 2.07,
    7: 2.13,
    10: 2.20,
    15: 2.31,
    20: 2.40,
    25: 2.46,
    30: 2.50,
    35: 2.56,
    40: 2.62,
    45: 2.68,
    50: 2.74
  },
  rough: {
    1: 2.05,
    3: 2.09,
    5: 2.15,
    7: 2.22,
    10: 2.29,
    15: 2.39,
    20: 2.49,
    25: 2.56,
    30: 2.61,
    35: 2.67,
    40: 2.73,
    45: 2.79,
    50: 2.85
  },
  bunker: {
    1: 2.24,
    3: 2.30,
    5: 2.37,
    7: 2.43,
    10: 2.50,
    15: 2.60,
    20: 2.70,
    25: 2.78,
    30: 2.86,
    35: 2.93,
    40: 3.00,
    45: 3.06,
    50: 3.12
  }
};