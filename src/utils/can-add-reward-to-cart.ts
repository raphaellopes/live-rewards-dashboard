import type { Reward } from './types';

export const canAddRewardToCart = (
  reward: Reward,
  userTotalPoints: number,
  cartTotalPoints: number
) => {
  return userTotalPoints - cartTotalPoints - reward.cost >= 0;
};
