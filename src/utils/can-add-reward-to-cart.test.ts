import { canAddRewardToCart } from './can-add-reward-to-cart';
import type { Reward } from './types';

const reward: Reward = {
  id: '1',
  name: 'Test Reward',
  cost: 5000,
  category: 'gift-card',
};

describe('utils/canAddRewardToCart', () => {
  it('returns true when user has sufficient balance', () => {
    expect(canAddRewardToCart(reward, 10000, 0)).toBe(true);
  });

  it('returns true when balance is exactly enough', () => {
    expect(canAddRewardToCart(reward, 5000, 0)).toBe(true);
  });

  it('returns false when user has insufficient balance', () => {
    expect(canAddRewardToCart(reward, 4000, 0)).toBe(false);
  });

  it('accounts for existing cart total', () => {
    expect(canAddRewardToCart(reward, 10000, 6000)).toBe(false);
  });
});
