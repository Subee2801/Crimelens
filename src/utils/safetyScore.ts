import { IncidentRecord } from "@/context/FilterContext";

export const CRIME_SEVERITY_WEIGHTS: Record<string, number> = {
  MURDER: 10,
  RAPE: 10,
  "ATTEMPT TO MURDER": 10,
  "KIDNAPPING & ABDUCTION": 10,
  ROBBERY: 7,
  RIOTS: 7,
  BURGLARY: 5,
  "AUTO THEFT": 3,
  THEFT: 3,
  CHEATING: 3,
};

export const DEFAULT_SEVERITY = 2;

export interface NeighborhoodScore {
  neighborhood: string;
  score: number; // 1-10 (10 is safest, 1 is most dangerous)
  rawRisk: number; // The absolute computed risk number
  incidentCount: number;
}

export function calculateNeighborhoodScores(records: IncidentRecord[]): Record<string, NeighborhoodScore> {
  const riskMap: Record<string, { count: number; risk: number }> = {};

  records.forEach((rec) => {
    const weight = CRIME_SEVERITY_WEIGHTS[rec.crimeType.toUpperCase()] || DEFAULT_SEVERITY;
    const addedRisk = rec.count * weight;

    if (!riskMap[rec.neighborhood]) {
      riskMap[rec.neighborhood] = { count: 0, risk: 0 };
    }
    riskMap[rec.neighborhood].count += rec.count;
    riskMap[rec.neighborhood].risk += addedRisk;
  });

  // Calculate scores on a 1-10 scale
  const neighborhoods = Object.keys(riskMap);
  if (neighborhoods.length === 0) return {};

  let minRisk = Infinity;
  let maxRisk = -Infinity;

  neighborhoods.forEach((n) => {
    const risk = riskMap[n].risk;
    if (risk < minRisk) minRisk = risk;
    if (risk > maxRisk) maxRisk = risk;
  });

  const range = maxRisk - minRisk;
  const scores: Record<string, NeighborhoodScore> = {};

  neighborhoods.forEach((n) => {
    const risk = riskMap[n].risk;
    let score = 5;

    if (range > 0) {
      // Normalize risk from 0 to 1
      const normalizedRisk = (risk - minRisk) / range;
      // Invert it so 0 risk = 10 score, max risk = 1 score
      score = 10 - normalizedRisk * 9;
    } else {
      score = risk > 0 ? 5 : 10;
    }

    scores[n] = {
      neighborhood: n,
      score: parseFloat(score.toFixed(1)),
      rawRisk: risk,
      incidentCount: riskMap[n].count,
    };
  });

  return scores;
}
