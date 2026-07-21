import useCartStore from './cart-store';
import useUserStore from './user-store';
import { MOCKED_REWARDS } from '../data/constants';

describe('store/cart-store', () => {
  beforeEach(() => {
    useUserStore.setState({ totalPoints: 50000 });
  });

  it('adds item id when user has sufficient points', () => {
    const reward = MOCKED_REWARDS[2]; // cost 5000

    useCartStore.getState().addItem(reward);

    expect(useCartStore.getState().itemIds).toEqual([reward.id]);
  });

  it('sums cart total points from added items', () => {
    const rewardA = MOCKED_REWARDS[2]; // cost 5000
    const rewardB = MOCKED_REWARDS[3]; // cost 9500

    useCartStore.getState().addItem(rewardA);
    useCartStore.getState().addItem(rewardB);

    expect(useCartStore.getState().getCartTotalPoints()).toBe(14500);
  });

  it('rejects addItem when points are insufficient', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    useUserStore.setState({ totalPoints: 1000 });
    const reward = MOCKED_REWARDS[0]; // cost 45000

    useCartStore.getState().addItem(reward);

    expect(useCartStore.getState().itemIds).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      'Rejected: Insufficient points balance'
    );
    warnSpy.mockRestore();
  });

  it('clears all items', () => {
    useCartStore.getState().addItem(MOCKED_REWARDS[2]);

    useCartStore.getState().clearItems();

    expect(useCartStore.getState().itemIds).toEqual([]);
  });

  it('canAddItem reflects user store points and cart total', () => {
    const reward = MOCKED_REWARDS[2]; // cost 5000
    useUserStore.setState({ totalPoints: 10000 });
    useCartStore.getState().addItem(reward);

    expect(useCartStore.getState().canAddItem(MOCKED_REWARDS[3])).toBe(false);
    expect(useCartStore.getState().canAddItem(MOCKED_REWARDS[2])).toBe(true);
  });
});
