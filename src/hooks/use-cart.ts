import { useState } from 'react';
import { type Reward } from '../utils/types';

type UseCartType = () => {
  items: Reward[];
  totalPoints: number;
  onClickRedeem: () => void;
  addToCart: (reward: Reward) => void;
};

const useCart: UseCartType = () => {
  const [items, setItems] = useState<Reward[]>([]);

  const totalPoints = items.reduce((acc, item) => acc + item.points, 0);

  const onClickRedeem = () => {
    console.log('redeem');
  };

  const addToCart = (reward: Reward) => {
    setItems([...items, reward]);
  };

  return { items, totalPoints, onClickRedeem, addToCart };
};

export default useCart;
