import { type FC, useId } from 'react';
import { type Reward } from '../utils/types';
import { formatPoints } from '../utils/format-points';

interface CartProps {
  items: Reward[];
  totalPoints: number;
  onClickRedeem: () => void;
}

// @TODO: implement edge-cases like empty list
const Cart: FC<CartProps> = ({ items, totalPoints, onClickRedeem }) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded-md min-w-xs">
      <h2 className="font-medium">Cart</h2>
      <p className="text-sm text-gray-500">{formatPoints(totalPoints)}</p>
      <ul>
        {items.map((item, index) => (
          <li key={`${id}-${item.id}-${index}`}>
            {item.name} - {formatPoints(item.points)}
          </li>
        ))}
      </ul>
      <button
        className="text-sm text-blue-500 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={onClickRedeem}
      >
        Redeem
      </button>
    </div>
  );
};

export default Cart;
