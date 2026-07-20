import { create } from 'zustand';
import { DEFAULT_USER_TOTAL_POINTS } from '../data/constants';

interface UserStore {
  totalPoints: number;
  setTotalPoints: (totalPoints: number) => void;
}

const useUserStore = create<UserStore>((set) => ({
  totalPoints: DEFAULT_USER_TOTAL_POINTS,
  setTotalPoints: (totalPoints) => set({ totalPoints }),
}));

// selectors
export const useTotalPoints = () => useUserStore((state) => state.totalPoints);

export const useSetTotalPoints = () =>
  useUserStore((state) => state.setTotalPoints);

export default useUserStore;
