import { formatPoints } from './format-points';

describe('utils/formatPoints', () => {
  it('formats zero as "0 points"', () => {
    expect(formatPoints(0)).toBe('0 points');
  });

  it('formats one as "1 point"', () => {
    expect(formatPoints(1)).toBe('1 point');
  });

  it('formats plural values with locale separators', () => {
    expect(formatPoints(10000)).toBe('10,000 points');
  });
});
