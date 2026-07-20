import type { RewardCategory } from '../utils/types';

export const DEFAULT_USER_TOTAL_POINTS = 50000;

export type ItemReward = {
  id: string;
  name: string;
  cost: number;
  category: RewardCategory;
};

export const CATEGORY_NAME_MAP: Record<RewardCategory, string> = {
  travel: 'Travel',
  'gift-card': 'Gift Card',
  merchandise: 'Merchandise',
};

export const MOCKED_REWARDS: ItemReward[] = [
  { id: '1', name: 'Free Flight to Iceland', cost: 45000, category: 'travel' },
  {
    id: '2',
    name: 'Luxury Hotel Upgrade (1 Night)',
    cost: 12000,
    category: 'travel',
  },
  { id: '3', name: '$50 Amazon Gift Card', cost: 5000, category: 'gift-card' },
  {
    id: '4',
    name: '$100 Starbucks Gift Card',
    cost: 9500,
    category: 'gift-card',
  },
  {
    id: '5',
    name: 'Noise-Canceling Headphones',
    cost: 20000,
    category: 'merchandise',
  },
];
