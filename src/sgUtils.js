import { puttTable, shortGamePga } from "./sgTables";

/**
 * Monotone cubic interpolation (PCHIP-lite).
 * This avoids weird overshoots and gives smoother values than plain linear interpolation.
 * Good fit for expected-strokes curves, which should be monotonic.
 */
function monotoneInterpolate(table, x) {
  const xs = Object.keys(table).map(Number).sort((a, b) => a - b);
  const ys = xs.map((k) => table[k]);
  const n = xs.length;

  if (x <= xs[0]) return ys[0];
  if (x >= xs[n - 1]) return ys[n - 1];

  const h = new Array(n - 1);
  const delta = new Array(n - 1);

  for (let i = 0; i < n - 1; i++) {
    h[i] = xs[i + 1] - xs[i];
    delta[i] = (ys[i + 1] - ys[i]) / h[i];
  }

  const m = new Array(n);

  m[0] = delta[0];
  m[n - 1] = delta[n - 2];

  for (let i = 1; i < n - 1; i++) {
    if (delta[i - 1] === 0 || delta[i] === 0 || delta[i - 1] * delta[i] < 0) {
      m[i] = 0;
    } else {
      const w1 = 2 * h[i] + h[i - 1];
      const w2 = h[i] + 2 * h[i - 1];
      m[i] = (w1 + w2) / (w1 / delta[i - 1] + w2 / delta[i]);
    }
  }

  let i = 0;
  while (x > xs[i + 1]) i++;

  const hi = h[i];
  const t = (x - xs[i]) / hi;

  const h00 = (2 * t ** 3) - (3 * t ** 2) + 1;
  const h10 = (t ** 3) - (2 * t ** 2) + t;
  const h01 = (-2 * t ** 3) + (3 * t ** 2);
  const h11 = (t ** 3) - (t ** 2);

  return (
    h00 * ys[i] +
    h10 * hi * m[i] +
    h01 * ys[i + 1] +
    h11 * hi * m[i + 1]
  );
}

export function expectedPutts(distanceFt) {
  if (distanceFt <= 0) return 0;
  return monotoneInterpolate(puttTable, distanceFt);
}

export function expectedShortGame(lie, yards) {
  const normalizedLie = lie.toLowerCase();
  const lieTable = shortGamePga[normalizedLie] || shortGamePga.rough;
  return monotoneInterpolate(lieTable, yards);
}

export function calcStrokesGainedOnGreen(startLie, startYards, leaveFt) {
  const start = expectedShortGame(startLie, startYards);
  const end = expectedPutts(leaveFt);
  return start - (1 + end);
}

export function calcStrokesGainedHoled(startLie, startYards) {
  const start = expectedShortGame(startLie, startYards);
  return start - 1;
}

export function calcStrokesGainedOffGreen(startLie, startYards, endLie, endYards) {
  const start = expectedShortGame(startLie, startYards);
  const end = expectedShortGame(endLie, endYards);
  return start - (1 + end);
}