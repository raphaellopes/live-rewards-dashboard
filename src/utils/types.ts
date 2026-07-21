export type RewardCategory = 'travel' | 'gift-card' | 'merchandise';
export type Reward = {
  id: string;
  name: string;
  category: RewardCategory;
  cost: number;
};
