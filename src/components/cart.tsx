import { type FC, useId, useMemo } from 'react';
import { formatPoints } from '../utils';
import { MOCKED_REWARDS } from '../data/constants';
import {
  useCartTotalPoints,
  useClearItems,
  useItemIds,
} from '../store/cart-store';
import { useSetTotalPoints, useTotalPoints } from '../store/user-store';

const Cart: FC = () => {
  const itemIds = useItemIds();
  const cartTotalPoints = useCartTotalPoints();
  const onClearCart = useClearItems();
  const userPoints = useTotalPoints();
  const setUserPoints = useSetTotalPoints();
  const items = useMemo(
    () =>
      itemIds
        .map((id) => MOCKED_REWARDS.find((reward) => reward.id === id))
        .filter((item) => !!item),
    [itemIds]
  );
  const id = useId();

  const handleClickRedeem = () => {
    setUserPoints(userPoints - cartTotalPoints);
    onClearCart();
  };

  return (
    <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded-md sm:w-xs">
      <h2 className="font-medium">Cart</h2>
      <p className="text-sm text-gray-500">{formatPoints(cartTotalPoints)}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={`${id}-${item.id}-${index}`} className="text-sm">
            {item.name} - {formatPoints(item.cost)}
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="text-sm text-gray-500 bg-gray-500/10 p-2 rounded-md">
          No items in cart. Please add some items to your cart from the rewards
          table using the "Add to Cart" button.
        </p>
      )}

      <button
        className="btn btn-primary"
        disabled={cartTotalPoints === 0}
        onClick={handleClickRedeem}
      >
        Redeem
      </button>
      {cartTotalPoints > 0 && (
        <p className="text-xs text-orange-500 bg-orange-500/10 p-2 rounded-md">
          You will have {formatPoints(userPoints - cartTotalPoints)} left after
          redeeming.
        </p>
      )}
    </div>
  );
};

export default Cart;
