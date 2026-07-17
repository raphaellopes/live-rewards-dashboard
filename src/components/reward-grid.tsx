import { type FC } from 'react';
import { formatPoints } from '../utils/format-points';
import { type Reward, type RewardCategory } from '../utils/types';
import { useCart } from '../contexts/cart';
import { useUserProfile } from '../contexts/user-profile';

interface RewardItemProps extends Reward {
  onAddToCart?: (id: string) => void;
  isAddToCartDisabled?: boolean;
}

const CATEGORY_NAME_MAP: Record<RewardCategory, string> = {
  travel: 'Travel',
  'gift-card': 'Gift Card',
  merchandise: 'Merchandise',
};

const RewardItem: FC<RewardItemProps> = ({
  id,
  name,
  category,
  points,
  onAddToCart,
  isAddToCartDisabled = false,
}) => (
  <div className="grid grid-cols-4 gap-2 border-b border-gray-200 pb-2">
    <div className="col-span-2 flex flex-col">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-sm text-gray-500">{formatPoints(points)}</span>
    </div>
    <div className="col-span-1">
      <span className="text-sm text-gray-500">
        {CATEGORY_NAME_MAP[category]}
      </span>
    </div>
    <div className="col-span-1 flex items-center justify-end gap-2">
      {isAddToCartDisabled && (
        <span className="text-sm text-red-500">Insufficient points</span>
      )}
      <button
        className="text-sm text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isAddToCartDisabled}
        onClick={() => onAddToCart?.(id)}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

interface RewardGridProps {}
const MOCKED_REWARDS = [
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
const RewardGrid: FC<RewardGridProps> = () => {
  const { addToCart, totalPoints: cartTotalPoints } = useCart();
  const { points: userPoints } = useUserProfile();
  const rewardItems = MOCKED_REWARDS.map((reward) => ({
    id: reward.id,
    name: reward.name,
    category: reward.category as RewardCategory,
    points: reward.cost,
    onAddToCart: () =>
      addToCart({
        id: reward.id,
        name: reward.name,
        category: reward.category as RewardCategory,
        points: reward.cost,
      }),
    isAddToCartDisabled: userPoints - cartTotalPoints - reward.cost < 0,
  }));
  return (
    <div className="grid grid-cols-1 gap-4">
      {rewardItems.map((item) => (
        <RewardItem
          key={item.id}
          {...item}
          onAddToCart={() => addToCart(item)}
        />
      ))}
    </div>
  );
};

export default RewardGrid;
