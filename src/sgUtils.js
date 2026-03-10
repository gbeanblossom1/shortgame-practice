import { puttTable, shortGamePga } from "./sgTables";

function interpolate(table, value) {
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);

  if (value <= keys[0]) return table[keys[0]];
  if (value >= keys[keys.length - 1]) return table[keys[keys.length - 1]];

  for (let i = 0; i < keys.length - 1; i++) {
    const left = keys[i];
    const right = keys[i + 1];

    if (value >= left && value <= right) {
      const leftVal = table[left];
      const rightVal = table[right];
      const t = (value - left) / (right - left);
      return leftVal + t * (rightVal - leftVal);
    }
  }

  return table[keys[keys.length - 1]];
}

export function expectedPutts(distanceFt) {
  if (distanceFt <= 0) return 0;
  return interpolate(puttTable, distanceFt);
}

export function expectedShortGame(lie, yards) {
  const normalizedLie = lie === "fringe" ? "fairway" : lie;
  const lieTable = shortGamePga[normalizedLie];
  return interpolate(lieTable, yards);
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