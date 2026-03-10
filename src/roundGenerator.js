const shotCatalog = [
  // Fringe / fairway baseline
  { lie: "fringe", yards: 5, weight: 3.5 },
  { lie: "fairway", yards: 8, weight: 3.2 },
  { lie: "fairway", yards: 10, weight: 2.8 },
  { lie: "fairway", yards: 12, weight: 2.5 },
  { lie: "fairway", yards: 15, weight: 2.2 },
  { lie: "fairway", yards: 18, weight: 1.8 },
  { lie: "fairway", yards: 20, weight: 1.6 },
  { lie: "fairway", yards: 25, weight: 1.4 },
  { lie: "fairway", yards: 30, weight: 1.2 },
  { lie: "fairway", yards: 35, weight: 0.9 },

  // Rough baseline
  { lie: "rough", yards: 6, weight: 3.0 },
  { lie: "rough", yards: 8, weight: 3.2 },
  { lie: "rough", yards: 10, weight: 2.8 },
  { lie: "rough", yards: 12, weight: 2.4 },
  { lie: "rough", yards: 15, weight: 2.1 },
  { lie: "rough", yards: 18, weight: 1.7 },
  { lie: "rough", yards: 20, weight: 1.5 },
  { lie: "rough", yards: 25, weight: 1.2 },
  { lie: "rough", yards: 30, weight: 1.0 },
  { lie: "rough", yards: 40, weight: 0.7 },

  // Greenside bunker baseline
  { lie: "bunker", yards: 4, weight: 0.8 },
  { lie: "bunker", yards: 6, weight: 1.2 },
  { lie: "bunker", yards: 8, weight: 2.0 },
  { lie: "bunker", yards: 10, weight: 2.2 },
  { lie: "bunker", yards: 12, weight: 2.0 },
  { lie: "bunker", yards: 15, weight: 1.6 },
  { lie: "bunker", yards: 18, weight: 1.2 },
  { lie: "bunker", yards: 20, weight: 1.0 },
  { lie: "bunker", yards: 25, weight: 0.7 },
  { lie: "bunker", yards: 30, weight: 0.5 },

  // Pitches, mapped into fairway / rough only, capped at 50
  { lie: "fairway", yards: 20, weight: 1.8 },
  { lie: "fairway", yards: 25, weight: 1.6 },
  { lie: "fairway", yards: 30, weight: 1.5 },
  { lie: "rough", yards: 35, weight: 1.4 },
  { lie: "fairway", yards: 40, weight: 1.8 },
  { lie: "fairway", yards: 45, weight: 1.6 },
  { lie: "fairway", yards: 50, weight: 2.0 },

  // Flop-like baseline, represented as lie + distance
  { lie: "fairway", yards: 8, weight: 0.8 },
  { lie: "rough", yards: 10, weight: 0.9 },
  { lie: "rough", yards: 12, weight: 0.8 },
  { lie: "fairway", yards: 15, weight: 0.7 },
  { lie: "fairway", yards: 20, weight: 0.5 },

  // Bump-and-run / specialty / fringe-putt baseline
  { lie: "fairway", yards: 10, weight: 1.8 },
  { lie: "fairway", yards: 15, weight: 1.6 },
  { lie: "fairway", yards: 20, weight: 1.3 },
  { lie: "fringe", yards: 8, weight: 2.5 },
  { lie: "fringe", yards: 12, weight: 2.0 }
];

function weightedChoice(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const r = Math.random() * totalWeight;

  let running = 0;
  for (const item of items) {
    running += item.weight;
    if (r <= running) return item;
  }

  return items[items.length - 1];
}

export function generateRound({ maxDistance = 50, availableLies = ["fringe", "fairway", "rough", "bunker"] }) {
  const filteredShots = shotCatalog.filter(
    (shot) => availableLies.includes(shot.lie) && shot.yards <= maxDistance
  );

  if (filteredShots.length === 0) {
    throw new Error("No valid shots available for the selected session setup.");
  }

  return Array.from({ length: 18 }, () => {
    const shot = weightedChoice(filteredShots);
    return {
      lie: shot.lie,
      yards: shot.yards
    };
  });
}
