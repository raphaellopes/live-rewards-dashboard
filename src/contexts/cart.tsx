import { createContext, useContext, useState, type FC } from 'react';
import { type Reward } from '../utils/types';

interface CartContextType {
  items: Reward[];
  totalPoints: number;
  addToCart: (reward: Reward) => void;
  onClearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalPoints: 0,
  addToCart: () => {},
  onClearCart: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Reward[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const addToCart = (reward: Reward) => {
    setItems([...items, reward]);
    setTotalPoints(totalPoints + reward.points);
  };

  const onClearCart = () => {
    setItems([]);
    setTotalPoints(0);
  };

  return (
    <CartContext.Provider
      value={{ items, totalPoints, addToCart, onClearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
