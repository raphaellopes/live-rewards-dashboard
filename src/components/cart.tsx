import { type FC, useId } from 'react';
import { formatPoints } from '../utils/format-points';
import { useUserProfile } from '../contexts/user-profile';
import { useCart } from '../contexts/cart';

const Cart: FC = () => {
  const { items, totalPoints: cartTotalPoints, onClearCart } = useCart();
  const { points: userPoints, setPoints: setUserPoints } = useUserProfile();
  const id = useId();

  const handleClickRedeem = () => {
    setUserPoints(userPoints - cartTotalPoints);
    onClearCart();
  };

  return (
    <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded-md min-w-xs">
      <h2 className="font-medium">Cart</h2>
      <p className="text-sm text-gray-500">{formatPoints(cartTotalPoints)}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={`${id}-${item.id}-${index}`} className="text-sm">
            {item.name} - {formatPoints(item.points)}
          </li>
        ))}
      </ul>

      <button
        className="text-sm text-blue-500 bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
