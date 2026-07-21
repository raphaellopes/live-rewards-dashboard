import { type FC } from 'react';
import { formatPoints, canAddRewardToCart, type Reward } from '../utils';
import { CATEGORY_NAME_MAP, MOCKED_REWARDS } from '../data/constants';
import { useAddItem, useCartTotalPoints } from '../store/cart-store';
import { useTotalPoints } from '../store/user-store';

interface RewardItemProps extends Reward {
  onAddToCart?: (id: string) => void;
  isAddToCartDisabled?: boolean;
}

const RewardItem: FC<RewardItemProps> = ({
  id,
  name,
  category,
  cost,
  onAddToCart,
  isAddToCartDisabled = false,
}) => (
  <div className="grid grid-cols-4 gap-2 border-b border-gray-200 pb-2">
    <div className="col-span-2 flex flex-col">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-sm text-gray-500">{formatPoints(cost)}</span>
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

const RewardGrid: FC = () => {
  const addToCart = useAddItem();
  const cartTotalPoints = useCartTotalPoints();
  const userPoints = useTotalPoints();

  return (
    <div className="grid grid-cols-1 gap-4">
      {MOCKED_REWARDS.map((item) => {
        const isTooExpensive = !canAddRewardToCart(
          item,
          userPoints,
          cartTotalPoints
        );

        return (
          <RewardItem
            key={item.id}
            id={item.id}
            name={item.name}
            category={item.category}
            cost={item.cost}
            onAddToCart={() => addToCart(item)}
            isAddToCartDisabled={isTooExpensive}
          />
        );
      })}
    </div>
  );
};

export default RewardGrid;
