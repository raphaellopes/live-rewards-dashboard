import { create } from 'zustand';
import useUserStore from './user-store';
import { MOCKED_REWARDS } from '../data/constants';
import type { Reward } from '../utils/types';
import { canAddRewardToCart } from '../utils/can-add-reward-to-cart';

interface CartStore {
  itemIds: string[];
  addItem: (reward: Reward) => void;
  clearItems: () => void;
  getCartTotalPoints: () => number;
  canAddItem: (reward: Reward) => boolean;
}

const useCartStore = create<CartStore>()((set, get) => ({
  itemIds: [],
  getCartTotalPoints: () =>
    get().itemIds.reduce((acc, itemId) => {
      const reward = MOCKED_REWARDS.find((reward) => reward.id === itemId);
      if (!reward) return acc;
      return acc + reward.cost;
    }, 0),
  canAddItem: (reward: Reward) => {
    const cartTotalPoints = get().getCartTotalPoints();
    const userPoints = useUserStore.getState().totalPoints;
    return canAddRewardToCart(reward, userPoints, cartTotalPoints);
  },
  addItem: (reward: Reward) => {
    set((state) => {
      if (!state.canAddItem(reward)) {
        console.warn('Rejected: Insufficient points balance');
        return state;
      }
      return { itemIds: state.itemIds.concat(reward.id) };
    });
  },
  clearItems: () => set({ itemIds: [] }),
}));

// selectors
export const useCartTotalPoints = () =>
  useCartStore((state) => state.getCartTotalPoints());
export const useItemIds = () => useCartStore((state) => state.itemIds);
export const useAddItem = () => useCartStore((state) => state.addItem);
export const useClearItems = () => useCartStore((state) => state.clearItems);
export default useCartStore;
