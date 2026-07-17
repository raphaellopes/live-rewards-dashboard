// Utility function to format raw numbers to point.
// the expected output should be: 10000 => "10,000 points". It should also handle
// the 0 and 1 cases.

export const formatPoints = (points: number): string => {
  if (points === 0) return '0 points';
  if (points === 1) return '1 point';
  return `${points.toLocaleString()} points`;
};
