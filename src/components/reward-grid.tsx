import { type FC } from 'react';
import { formatPoints } from '../utils/format-points';

export type RewardCategory = 'travel' | 'gift-card' | 'merchandise';

interface RewardItemProps {
  id: string;
  name: string;
  category: RewardCategory;
  points: number;
  onAddToCart: (id: string) => void;
  isAddToCartDisabled: boolean;
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
    <div className="col-span-1 flex items-center justify-end">
      <button className="text-sm text-blue-500" onClick={() => onAddToCart(id)}>
        Add to Cart
      </button>
    </div>
  </div>
);

interface RewardGridProps {
  items: RewardItemProps[];
}

const RewardGrid: FC<RewardGridProps> = ({ items }) => (
  <div className="grid grid-cols-1 gap-4">
    {items.map((item) => (
      <RewardItem key={item.id} {...item} />
    ))}
  </div>
);

export default RewardGrid;
